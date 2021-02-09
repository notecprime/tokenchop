// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;
pragma abicoder v2;

import "./interfaces/IBEP20.sol";
import "./interfaces/ITokenChopToken.sol";
import "./interfaces/IStdReference.sol";
import "./libs/SafeMath.sol";
import "./libs/Math.sol";

contract TokenChopToken is IBEP20, ITokenChopToken {
    using SafeMath for uint256;
    mapping(address => uint256) public override balanceOf;
    mapping(address => mapping(address => uint256)) public override allowance;

    string public override name;
    string public override symbol;
    string public baseSymbol;
    string public quoteSymbol;
    string public poolType;
    address public base;
    address public quote;
    address public sister;
    address public factory;
    uint256 public collateral;
    uint256 public price;
    uint256 public override totalSupply;
    address private constant _bandProtocol = 0xDA7a001b254CD22e46d3eAB04d937489c93174C3;

    event CollateralTransfer(address indexed from, address indexed to, uint256 value);
    event PriceUpdate(uint256 oldPrice, uint256 newPrice);

    constructor() {
        factory = msg.sender;
    }

    function initialize(int8 typeId, address _base, address _quote, address _sister) external override {
        require(msg.sender == factory, 'TokenChop: FORBIDDEN');
        poolType = typeId == 0 ? "Stable" : "Spec";
        base = _base;
        quote = _quote;
        sister = _sister;
        IBEP20 baseContract = IBEP20(base);
        baseSymbol = baseContract.symbol();
        baseSymbol = keccak256(abi.encodePacked(baseSymbol)) == keccak256(abi.encodePacked("WBNB")) ? "BNB" : baseSymbol;
        IBEP20 quoteContract = IBEP20(quote);
        quoteSymbol = quoteContract.symbol();
        name = string(abi.encodePacked(bytes("TokenChop: "), bytes(baseSymbol), bytes("/"), bytes(quoteSymbol), bytes(" "), bytes(poolType)));
        symbol = string(abi.encodePacked(bytes(baseSymbol), bytes(quoteSymbol), bytes(typeId == 0 ? '0' : '1')));
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

    function updatePrice() public returns (bool) {
        IStdReference bandProtocolContract = IStdReference(_bandProtocol);
        IStdReference.ReferenceData memory data = bandProtocolContract.getReferenceData(baseSymbol,quoteSymbol);
        uint256 newPrice = data.rate;
        if (price == newPrice) {
            return true;
        }
        if (price == 0) {
            price = newPrice;
        }
        uint256 newCollateral = 0;
        if (collateral != 0) {
            newCollateral = Math.mulDiv(price, newPrice, collateral);
            rebalanceCollateral(newCollateral);
        }
        price = newPrice;
        emit PriceUpdate(price, newPrice);        
        return true;
    }

    function rebalanceCollateral(uint256 newCollateral) public returns (bool) {
        if (newCollateral > collateral) {
            uint256 amount = newCollateral.sub(collateral);
            uint obtained = getCollateralFromSister(amount);
        } else {
            uint256 amount = collateral.sub(newCollateral);
            uint sent = sendCollateralToSister(amount);
        }
        return true;
    }

    function getCollateralFromSister(uint256 _amount) internal returns (uint) {
        TokenChopToken _sisterContract = TokenChopToken(sister);
        uint received = _sisterContract.sendCollateralToSister(_amount);
        collateral = collateral.add(received);
        return received;
    }

    function sendCollateralToSister(uint256 _requestedAmount) public returns (uint256 amount) {
        uint _amount = collateral < _requestedAmount ? collateral : _requestedAmount;
        IBEP20 baseContract = IBEP20(base);
        bool success = baseContract.transfer(sister, _amount);
        if (success) {
            collateral = collateral.sub(_amount);
        }
        uint _sentAmount = success ? _amount : 0;
        emit CollateralTransfer(address(this), sister, _sentAmount);
        return _sentAmount;
    }

    function mint(uint256 _collateralAmount) public returns (bool) {
        IBEP20 baseContract = IBEP20(base);
        bool result = baseContract.transferFrom(msg.sender, address(this), _collateralAmount); //try a transfer from
        emit Transfer(address(0), msg.sender, 1);
        require(result, "Failed to transfer token. Transfer must be approved first");
        bool updatePriceDone = updatePrice();
        // value of amount in tokens is _totalSupply/collateral
        uint256 _tokenAmount = _collateralAmount;
        if (totalSupply != 0 && collateral != 0 && _collateralAmount != 0) {
            _tokenAmount = Math.mulDiv(totalSupply, collateral, _collateralAmount);
        }
        balanceOf[msg.sender] = balanceOf[msg.sender].add(_tokenAmount);
        totalSupply = totalSupply.add(_tokenAmount);
        collateral = collateral.add(_collateralAmount);
        emit Transfer(address(0), msg.sender, _tokenAmount);
        emit CollateralTransfer(msg.sender, address(this), _collateralAmount);
        return true;
    }

    function burn(uint256 _tokenAmount) public returns (bool) {
        require(_tokenAmount <= balanceOf[msg.sender]);
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_tokenAmount);
        bool updatePriceDone = updatePrice();
        // amount to return is colat*tokens/totalsupply
        emit Transfer(address(0), msg.sender, collateral);
        emit Transfer(address(0), msg.sender, _tokenAmount);
        emit Transfer(address(0), msg.sender, totalSupply);                        
        uint256 collateralAmount = Math.mulDiv(collateral, _tokenAmount, totalSupply);
        emit Transfer(address(0), msg.sender, collateralAmount);                                
        // collateral = collateral.sub(collateralAmount);
        // emit Transfer(msg.sender, address(0), _tokenAmount);
        // emit CollateralTransfer(address(this), msg.sender, collateralAmount);        
        // IBEP20 baseContract = IBEP20(base);
        // return baseContract.transfer(msg.sender, collateralAmount);
    }

}