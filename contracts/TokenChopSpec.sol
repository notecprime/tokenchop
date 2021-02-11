// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;
pragma abicoder v2;

import "./interfaces/IBEP20.sol";
import "./interfaces/ITokenChopToken.sol";
import "./TokenChopStable.sol";
import "./interfaces/IStdReference.sol";
import "./libs/SafeMath.sol";
import "./libs/Math.sol";

contract TokenChopSpec is IBEP20, ITokenChopToken {
    using SafeMath for uint256;
    mapping(address => uint256) public override balanceOf;
    mapping(address => mapping(address => uint256)) public override allowance;

    string  public override name;
    string  public override symbol;
    string  public baseSymbol;
    string  public quoteSymbol;
    string  public constant poolType = "Spec";
    uint8   public constant typeId = 1;
    address public base;
    address public quote;
    address public sister;
    address public factory;
    uint256 public collateral;
    uint256 public previousPrice;
    uint256 public price;
    uint256 public override totalSupply;
    address public bandProtocol;

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

    function initialize(address _base, address _quote, address _sister) external override onlyFactory {
        bandProtocol = 0xDA7a001b254CD22e46d3eAB04d937489c93174C3;
        base = _base;
        quote = _quote;
        sister = _sister;
        baseSymbol = IBEP20(base).symbol();
        baseSymbol = keccak256(abi.encodePacked(baseSymbol)) == keccak256(abi.encodePacked("WBNB")) ? "BNB" : baseSymbol;
        quoteSymbol = IBEP20(quote).symbol();
        name = string(abi.encodePacked(bytes("TokenChop: "), bytes(baseSymbol), bytes("/"), bytes(quoteSymbol), bytes(" Spec")));
        symbol = string(abi.encodePacked(bytes(baseSymbol), bytes(quoteSymbol), bytes('1')));
    }

    function setBandAddress(address _bandAddr) external override onlyFactory {
        bandProtocol = _bandAddr;
    }

    function getOwner() external override view returns (address) {
        return factory;
    }

    function decimals() external override pure returns (uint8) {
        return 18;
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

        emit Transfer(_sender, _recipient, _amount);
    }

    function _approve(address _owner, address _spender, uint256 _amount) internal {
        require(_owner != address(0), "BEP20: approve from the zero address");
        require(_spender != address(0), "BEP20: approve to the zero address");

        allowance[_owner][_spender] = _amount;
        emit Approval(_owner, _spender, _amount);
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
        TokenChopStable(sister).updateCollateralBySister();
    }

    function sendCollateralToSister(uint256 baseRequested) public onlySister returns (uint256 baseSent) {
        uint baseSent = collateral < baseRequested ? collateral : baseRequested;
        // reentry risk?
        _safeTransfer(base, sister, baseSent);
        collateral = collateral.sub(baseSent);
        emit CollateralTransfer(address(this), sister, baseSent);
        return baseSent;
    }

    function mint(uint256 _collateralAmount) public returns (bool) {
        _safeTransferFrom(base, msg.sender, address(this), _collateralAmount);
        //do i need pending collateral
        updatePrice();
        // updateCollateral();
        // // value of amount in tokens is _totalSupply/collateral
        // uint256 _tokenAmount = _collateralAmount;
        // if (totalSupply != 0 && collateral != 0 && _collateralAmount != 0) {
        //     _tokenAmount = Math.mulDiv(totalSupply, collateral, _collateralAmount);
        // }
        // balanceOf[msg.sender] = balanceOf[msg.sender].add(_tokenAmount);
        // totalSupply = totalSupply.add(_tokenAmount);
        // collateral = collateral.add(_collateralAmount);
        //emit Transfer(address(0), msg.sender, _tokenAmount);
        //emit CollateralTransfer(msg.sender, address(this), _collateralAmount);
        return true;
    }

    function burn(uint256 _tokenAmount) public returns (bool) {
        //require(_tokenAmount <= balanceOf[msg.sender]);
        //balanceOf[msg.sender] = balanceOf[msg.sender].sub(_tokenAmount);
        updatePrice();
        // updateCollateral();
        // // amount to return is colat*tokens/totalsupply
        // uint256 collateralAmount = Math.mulDiv(collateral, _tokenAmount, totalSupply);
        // collateral = collateral.sub(collateralAmount);
        // _safeTransfer(base, msg.sender, collateralAmount);
        // emit Transfer(msg.sender, address(0), _tokenAmount);
        // emit CollateralTransfer(address(this), msg.sender, collateralAmount);        
        return true;
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