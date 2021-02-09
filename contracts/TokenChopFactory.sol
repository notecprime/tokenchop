// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;

import './interfaces/ITokenChopFactory.sol';
import './TokenChopToken.sol';

contract TokenChopFactory is ITokenChopFactory {
    address public override feeTo;
    address public override feeToSetter;

    mapping(address => mapping(address => address)) public override getStableAddress;
    mapping(address => mapping(address => address)) public override getSpecAddress;
    address[] public override allStable;
    address[] public override allSpec;

    constructor(address _feeToSetter) {
        feeToSetter = _feeToSetter;
    }

    function allPairsLength() external view override returns (uint) {
        return allStable.length;
    }

    // base/quote. i.e. ETH/USD = 1200, One ETH is 1200 USD
    function createPair(address _base, address _quote) external override returns (address stable, address spec) {
        require(_base != _quote, 'TokenChop: IDENTICAL_ADDRESSES');
        require(_base != address(0) && _quote != address(0), 'TokenChop: ZERO_ADDRESS');
        require(getStableAddress[_base][_quote] == address(0), 'TokenChop: STABLE_EXISTS');
        require(getSpecAddress[_base][_quote] == address(0), 'TokenChop: SPEC_EXISTS');
        address _stableAddr = createToken(0, _base, _quote);
        address _specAddr = createToken(1, _base, _quote);
        ITokenChopToken(_stableAddr).initialize(0, _base, _quote, _specAddr);
        ITokenChopToken(_specAddr).initialize(1, _base, _quote, _stableAddr);
        getStableAddress[_base][_quote] = _stableAddr;
        getSpecAddress[_base][_quote] = _specAddr;
        allStable.push(_stableAddr);
        allSpec.push(_specAddr);
        emit PairCreated(_base, _quote, _stableAddr, _specAddr, allStable.length);
        return (_stableAddr, _specAddr);
    }

    function createToken(int8 _type, address _base, address _quote) internal returns (address) {
        bytes memory bytecode = type(TokenChopToken).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(_type, _base, _quote));
        address _token;
        assembly {
            _token := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        return _token;
    }

    function setFeeTo(address _feeTo) external override {
        require(msg.sender == feeToSetter, 'TokenChop: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external override {
        require(msg.sender == feeToSetter, 'TokenChop: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
