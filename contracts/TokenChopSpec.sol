// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;
pragma abicoder v2;

import "./interfaces/IBEP20.sol";
import "./interfaces/ITokenChopToken.sol";
import "./TokenChopStable.sol";
import "./libs/SafeMath.sol";
import "./libs/Math.sol";

contract TokenChopSpec is IBEP20, ITokenChopToken {
    using SafeMath for uint256;
    mapping(address => uint256) public override balanceOf;
    mapping(address => mapping(address => uint256)) public override allowance;
    address[] private _balanceKeys;
    uint private _balanceKeysLength;

    string  public override name;
    string  public override symbol;
    string  public baseSymbol;
    string  public quoteSymbol;
    string  public constant poolType = "Spec";
    uint8   public constant typeId = 1;
    address public base;
    address public quote;
    uint256 private _quotePrice;
    address public sister;
    address public factory;
    uint256 public override totalSupply;

    event CollateralTransfer(address indexed from, address indexed to, uint256 value);
    event PriceUpdate(uint256 oldPrice, uint256 newPrice);

    bytes4 private constant TRANSFER_SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
    bytes4 private constant TRANSFER_FROM_SELECTOR = bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
    
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

    function collateral() external view returns (uint256) {
        return IBEP20(base).balanceOf(address(this));
    }

    function initialize(address _base, address _quote, address _sister) external override onlyFactory {
        base = _base;
        quote = _quote;
        sister = _sister;
        baseSymbol = IBEP20(base).symbol();
        quoteSymbol = IBEP20(quote).symbol();
        name = string(abi.encodePacked(bytes("TokenChop: "), bytes(baseSymbol), bytes("/"), bytes(quoteSymbol), bytes(" Spec")));
        symbol = string(abi.encodePacked(bytes(baseSymbol), bytes(quoteSymbol), bytes('1')));
    }

    function getOwner() external override view returns (address) {
        return factory;
    }

    function decimals() external override pure returns (uint8) {
        return 18;
    }

    function price() external view returns (uint256) {
        uint256 _collateral = IBEP20(base).balanceOf(address(this));
        if (_collateral == 0) return 0;
        return Math.mulDiv(totalSupply, uint256(10**18), _collateral);
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

    function _addToBalanceKeys(address _key) internal {
        for (uint i = 0; i < _balanceKeysLength; i++) {
            if (_balanceKeys[i] == _key) return;
        }
        _balanceKeys.push(_key);
        _balanceKeysLength++;
    }

    function _approve(address _owner, address _spender, uint256 _amount) internal {
        require(_owner != address(0), "BEP20: approve from the zero address");
        require(_spender != address(0), "BEP20: approve to the zero address");

        allowance[_owner][_spender] = _amount;
        emit Approval(_owner, _spender, _amount);
    }

    function refreshSister() internal {
        TokenChopStable(sister).refresh();
        _quotePrice = TokenChopStable(sister).price();
    }

    function sendCollateralToSister(uint256 baseRequested) public onlySister returns (uint256 sent) {
        uint256 _collateral = IBEP20(base).balanceOf(address(this));
        uint baseSent = _collateral < baseRequested ? _collateral : baseRequested;
        _safeTransfer(base, sister, baseSent);
        emit CollateralTransfer(address(this), sister, baseSent);
        return baseSent;
    }

    function mintAtBaseAmount(uint256 baseAmount) public returns (bool) {
        refreshSister();
        uint256 _collateral = IBEP20(base).balanceOf(address(this));        
        uint256 supplyAmount;
        if (_collateral == 0 || totalSupply == 0) {
            for (uint256 i = 0; i < _balanceKeysLength; i++) {
                address key = _balanceKeys[i];
                balanceOf[key] = 0;
            }
            totalSupply = 0;
            supplyAmount = Math.baseToQuote(_quotePrice, baseAmount);
        } else {
            supplyAmount = Math.baseToSupply(totalSupply, _collateral, baseAmount);
        }      
        _safeTransferFrom(base, msg.sender, address(this), baseAmount);        
        balanceOf[msg.sender] = balanceOf[msg.sender].add(supplyAmount);
        _addToBalanceKeys(msg.sender);        
        totalSupply = totalSupply.add(supplyAmount);
        emit Transfer(address(0), msg.sender, supplyAmount);
        emit CollateralTransfer(msg.sender, address(this), baseAmount);
        return true;
    }

    function burn(uint256 supplyAmount) public returns (bool) {
        require(supplyAmount <= balanceOf[msg.sender], "bad supply amount");
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(supplyAmount);
        refreshSister();
        uint256 baseAmount = Math.supplyToBase(totalSupply, IBEP20(base).balanceOf(address(this)), supplyAmount);
        totalSupply = totalSupply.sub(supplyAmount);
        _safeTransfer(base, msg.sender, baseAmount);
        emit Transfer(msg.sender, address(0), supplyAmount);
        emit CollateralTransfer(address(this), msg.sender, baseAmount);        
        return true;
    }

    function refresh() public {
        refreshSister();
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