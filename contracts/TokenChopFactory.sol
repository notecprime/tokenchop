// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;

import './interfaces/ITokenChopFactory.sol';
import './TokenChopStable.sol';
import './TokenChopSpec.sol';

contract TokenChopFactory is ITokenChopFactory {
    address public override feeTo;
    address public override feeToSetter;
    address public bandAddr;

    mapping(address => mapping(address => address)) public override getStableAddress;
    mapping(address => mapping(address => address)) public override getSpecAddress;
    address[] public override allStable;
    address[] public override allSpec;

    constructor(address _feeToSetter, address _bandAddr) {
        feeToSetter = _feeToSetter;
        bandAddr = _bandAddr;
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
        bytes memory stableBytecode = type(TokenChopStable).creationCode;
        bytes32 stableSalt = keccak256(abi.encodePacked("Stable", _base, _quote));
        address stableToken;
        assembly {
            stableToken := create2(0, add(stableBytecode, 32), mload(stableBytecode), stableSalt)
        }
        address specToken;
        bytes memory specBytecode = type(TokenChopSpec).creationCode;
        bytes32 specSalt = keccak256(abi.encodePacked("Spec", _base, _quote));
        assembly {
            specToken := create2(0, add(specBytecode, 32), mload(specBytecode), specSalt)
        }
        ITokenChopToken(stableToken).initialize(_base, _quote, specToken);
        //ITokenChopToken(stableToken).setBandAddress(bandAddr);
        ITokenChopToken(specToken).initialize(_base, _quote, stableToken);
        getStableAddress[_base][_quote] = stableToken;
        getSpecAddress[_base][_quote] = specToken;
        allStable.push(stableToken);
        allSpec.push(specToken);
        emit PairCreated(_base, _quote, stableToken, specToken, allStable.length);
        return (stableToken, specToken);
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
