// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;

import './interfaces/ITokenChopPoolFactory.sol';
import './TokenChopSpec.sol';

contract TokenChopSpecFactory is ITokenChopPoolFactory {
    address public factory;

    constructor(address _factory) {
        factory = _factory;
    }
    
    function createPool(address _base, address _quote) override external returns (address spec) {
        require(msg.sender == factory, 'TokenChop: FORBIDDEN');
        address specToken;
        bytes memory specBytecode = type(TokenChopSpec).creationCode;
        bytes32 specSalt = keccak256(abi.encodePacked("Spec", _base, _quote));
        assembly {
            specToken := create2(0, add(specBytecode, 32), mload(specBytecode), specSalt)
        }
        return specToken;
    }

    function initialize(address _base, address _quote, address _spec, address _stable) override external {
        require(msg.sender == factory, 'TokenChop: FORBIDDEN');
        ITokenChopToken(_spec).initialize(_base, _quote, _stable);
    }
}
