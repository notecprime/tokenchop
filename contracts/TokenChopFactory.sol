// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;

import './interfaces/ITokenChopFactory.sol';
import './interfaces/ITokenChopPoolFactory.sol';

contract TokenChopFactory is ITokenChopFactory {
    address public override poolFactorySetter;
    address public stableFactory;
    address public specFactory;

    mapping(address => mapping(address => address)) public override getStableAddress;
    mapping(address => mapping(address => address)) public override getSpecAddress;
    address[] public override allStable;
    address[] public override allSpec;

    constructor(address _poolFactorySetter) {
        poolFactorySetter = _poolFactorySetter;
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
        address stableToken = ITokenChopPoolFactory(stableFactory).createPool(_base, _quote);
        address specToken = ITokenChopPoolFactory(specFactory).createPool(_base, _quote);
        ITokenChopPoolFactory(stableFactory).initialize(_base, _quote, stableToken, specToken);
        ITokenChopPoolFactory(specFactory).initialize(_base, _quote, specToken, stableToken);
        getStableAddress[_base][_quote] = stableToken;
        getSpecAddress[_base][_quote] = specToken;
        allStable.push(stableToken);
        allSpec.push(specToken);
        emit PairCreated(_base, _quote, stableToken, specToken, allStable.length);
        return (stableToken, specToken);
    }

    function setPoolFactories(address _stable, address _spec) external override {
        require(msg.sender == poolFactorySetter, 'TokenChop: FORBIDDEN');
        stableFactory = _stable;
        specFactory = _spec;
    }

}
