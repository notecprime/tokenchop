// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;

interface ITokenChopToken {
    function initialize(uint8 typeId, address base, address quote, address sister) external;
    function setBandAddress(address) external;
}
