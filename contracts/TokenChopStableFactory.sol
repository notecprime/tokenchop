// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;

import './interfaces/ITokenChopPoolFactory.sol';
import './TokenChopStable.sol';

contract TokenChopStableFactory is ITokenChopPoolFactory {
    address public factory;
    address public bandAddr;

    constructor(address _factory, address _bandProtocol) {
        factory = _factory;
        bandAddr = _bandProtocol;
    }
    
    function createPool(address _base, address _quote) override external returns (address stable) {
        require(msg.sender == factory, 'TokenChop: FORBIDDEN');
        address stableToken;
        bytes memory stableBytecode = type(TokenChopStable).creationCode;
        bytes32 stableSalt = keccak256(abi.encodePacked("Stable", _base, _quote));
        assembly {
            stableToken := create2(0, add(stableBytecode, 32), mload(stableBytecode), stableSalt)
        }
        return stableToken;
    }

    function initialize(address _base, address _quote, address _stable, address _spec) override external {
        require(msg.sender == factory, 'TokenChop: FORBIDDEN');
        ITokenChopToken(_stable).initialize(_base, _quote, _spec);
        TokenChopStable(_stable).setBandAddress(bandAddr);
    }
}
