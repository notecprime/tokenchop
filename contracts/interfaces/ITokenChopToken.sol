// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;

interface ITokenChopToken {
    function initialize(int8 typeId, address base, address quote, address sister) external;
}
