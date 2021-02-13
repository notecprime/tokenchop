// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;
pragma abicoder v2;

import "./interfaces/IBEP20.sol";
import "./interfaces/ITokenChopToken.sol";
import "./TokenChopSpec.sol";
import "./interfaces/IStdReference.sol";
import "./libs/SafeMath.sol";
import "./libs/Math.sol";

contract TokenChopStable is IBEP20, ITokenChopToken {
    using SafeMath for uint256;
    mapping(address => uint256) public override balanceOf;
    mapping(address => mapping(address => uint256)) public override allowance;
    address[] private _balanceKeys;
    uint private _balanceKeysLength;

    string  public override name;
    string  public override symbol;
    string  public baseSymbol;
    string  public quoteSymbol;
    string  public constant poolType = "Stable";
    uint8   public constant typeId = 0;
    address public base;
    address public quote;
    address public sister;
    address public factory;
    uint256 public previousPrice;
    uint256 public price;
    uint8   public constant priceDecimals = 18;
    uint256 public override totalSupply;
    address public bandProtocol;

    event CollateralTransfer(address indexed from, address indexed to, uint256 value);
    event CollateralCapitalize(uint256 prevTotalSupply, uint256 newTotalSupply);
    event InsufficientCollateral(uint256 required, uint256 obtained);
    event PriceUpdate(uint256 oldPrice, uint256 newPrice);

    bytes4 private constant TRANSFER_SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
    bytes4 private constant TRANSFER_FROM_SELECTOR = bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
    bool private _updateCollateralInProgress = false;

    constructor() {
        factory = msg.sender;
    }

    modifier onlyFactory() {
        require(msg.sender == factory, 'TokenChop: FORBIDDEN');
        _;
    }

    modifier onlySister() {
        require(msg.sender == sister, 'TokenChop: FORBIDDEN');
        _;
    }

    function initialize(address _base, address _quote, address _sister) external override onlyFactory {
        bandProtocol = 0xDA7a001b254CD22e46d3eAB04d937489c93174C3;
        base = _base;
        quote = _quote;
        sister = _sister;
        baseSymbol = IBEP20(base).symbol();
        baseSymbol = keccak256(abi.encodePacked(baseSymbol)) == keccak256(abi.encodePacked("WBNB")) ? "BNB" : baseSymbol;
        quoteSymbol = IBEP20(quote).symbol();
        name = string(abi.encodePacked(bytes("TokenChop: "), bytes(baseSymbol), bytes("/"), bytes(quoteSymbol), bytes(" Stable")));
        symbol = string(abi.encodePacked(bytes(baseSymbol), bytes(quoteSymbol), bytes('0')));
    }

    function setBandAddress(address _bandAddr) external onlyFactory {
        bandProtocol = _bandAddr;
    }

    function getOwner() external override view returns (address) {
        return factory;
    }

    function decimals() external override pure returns (uint8) {
        return 18;
    }

    function collateral() external view returns (uint256) {
        return IBEP20(base).balanceOf(address(this));
    }

    function transfer(address _recipient, uint256 _amount) external override returns (bool) {
        _transfer(msg.sender, _recipient, _amount);
        return true;
    }

    function approve(address _spender, uint256 _amount) external override returns (bool) {
        _approve(msg.sender, _spender, _amount);
        return true;
    }

    function transferFrom(address _sender, address _recipient, uint256 _amount) external override returns (bool) {
        _transfer(_sender, _recipient, _amount);
        require(allowance[_sender][msg.sender] >= _amount, "BEP20: transfer amount exceeds allowance");
        _approve(_sender, msg.sender, allowance[_sender][msg.sender] - _amount);
        return true;
    }

    function _transfer(address _sender, address _recipient, uint256 _amount) internal {
        require(_sender != address(0), "BEP20: transfer from the zero address");
        require(_recipient != address(0), "BEP20: transfer to the zero address");
        require(balanceOf[_sender] >= _amount, "BEP20: transfer amount exceeds balance");
        
        balanceOf[_sender] = balanceOf[_sender].sub(_amount);
        balanceOf[_recipient] = balanceOf[_recipient].add(_amount);
        _addToBalanceKeys(_recipient);        

        emit Transfer(_sender, _recipient, _amount);
    }

    function _approve(address _owner, address _spender, uint256 _amount) internal {
        require(_owner != address(0), "BEP20: approve from the zero address");
        require(_spender != address(0), "BEP20: approve to the zero address");

        allowance[_owner][_spender] = _amount;
        emit Approval(_owner, _spender, _amount);
    }

    function _addToBalanceKeys(address _key) internal {
        for (uint i = 0; i < _balanceKeysLength; i++) {
            if (_balanceKeys[i] == _key) return;
        }
        _balanceKeys.push(_key);
        _balanceKeysLength++;
    }

    function updatePrice() internal {
        IStdReference bandProtocolContract = IStdReference(bandProtocol);
        IStdReference.ReferenceData memory data = bandProtocolContract.getReferenceData(baseSymbol, quoteSymbol);
        uint256 newPrice = data.rate;
        require(newPrice != 0, "TokenChop: Price update Failed");
        emit PriceUpdate(price, newPrice);
        previousPrice = price;
        price = newPrice;
    }

    function updateCollateral() internal {
        require(!_updateCollateralInProgress, "Update collateral in progress");
        _updateCollateralInProgress = true;
        uint256 _baseTotalSupply = Math.quoteToBase(price, totalSupply);
        uint256 _collateral = IBEP20(base).balanceOf(address(this));
        if (_collateral == _baseTotalSupply) {
            _updateCollateralInProgress = false;
            return;
        }
        if (_collateral < _baseTotalSupply) {
            uint256 _baseRequired = _baseTotalSupply.sub(_collateral);
            uint256 _baseObtained = TokenChopSpec(sister).sendCollateralToSister(_baseRequired);
            if (_baseObtained < _baseRequired) {
                uint256 _shortfall = Math.baseToQuote(price, _baseRequired.sub(_baseObtained));
                uint newTotalSupply = totalSupply.sub(_shortfall);
                emit InsufficientCollateral(_baseRequired, _baseObtained);
                rebalanceAccounts(totalSupply, newTotalSupply);
                totalSupply = newTotalSupply;
            }
        } else {
            if (TokenChopSpec(sister).collateral() == 0) { // Nothing in sister contract add collateral to totalSupply
                uint newTotalSupply = Math.baseToQuote(price, _collateral);
                emit CollateralCapitalize(totalSupply, newTotalSupply);
                rebalanceAccounts(totalSupply, newTotalSupply);
                totalSupply = newTotalSupply;                
            } else {
                uint256 _surplus = _collateral.sub(_baseTotalSupply);                
                sendStableCollateralToSpec(_surplus);
            }
        }
        _updateCollateralInProgress = false;
    }

    function rebalanceAccounts(uint256 _prevTotalSupply, uint256 _newTotalSupply) internal {
        for (uint256 i = 0; i < _balanceKeysLength; i++) {
            address key = _balanceKeys[i];
            balanceOf[key] = Math.mulDiv(balanceOf[key], _newTotalSupply, _prevTotalSupply);
        }
    }

    function sendStableCollateralToSpec(uint256 _baseAmount) internal {
        _safeTransfer(base, sister, _baseAmount);
        emit CollateralTransfer(address(this), sister, _baseAmount);
    }

    function mintAtBaseAmount(uint256 baseAmount) public returns (bool) {
        updatePrice();
        updateCollateral();
        _safeTransferFrom(base, msg.sender, address(this), baseAmount);
        uint256 quoteAmount = Math.baseToQuote(price, baseAmount);
        balanceOf[msg.sender] = balanceOf[msg.sender].add(quoteAmount);
        _addToBalanceKeys(msg.sender);        
        totalSupply = totalSupply.add(quoteAmount);
        emit Transfer(address(0), msg.sender, quoteAmount);
        emit CollateralTransfer(msg.sender, address(this), baseAmount);
        return true;
    }

    function burn(uint256 quoteAmount) public returns (bool) {
        updatePrice();
        updateCollateral();
        require(quoteAmount <= balanceOf[msg.sender], "Bad quote amount");
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(quoteAmount);
        totalSupply = totalSupply.sub(quoteAmount);
        uint256 baseAmount = Math.quoteToBase(price, quoteAmount);
        _safeTransfer(base, msg.sender, baseAmount);
        emit Transfer(msg.sender, address(0), quoteAmount);
        emit CollateralTransfer(address(this), msg.sender, baseAmount);
        return true;
    }

    function refresh() public {
        updatePrice();
        updateCollateral();
    }

    function _safeTransfer(address _token, address _to, uint _value) private {
        (bool _success, bytes memory _data) = _token.call(abi.encodeWithSelector(TRANSFER_SELECTOR, _to, _value));
        require(_success && (_data.length == 0 || abi.decode(_data, (bool))), 'TokenChop: TRANSFER_FAILED');
    }

    function _safeTransferFrom(address _token, address _sender, address _recipient, uint _value) private {
        (bool _success, bytes memory _data) = _token.call(abi.encodeWithSelector(TRANSFER_FROM_SELECTOR, _sender, _recipient, _value));
        require(_success && (_data.length == 0 || abi.decode(_data, (bool))), 'TokenChop: TRANSFER_FROM_FAILED');
    }

}