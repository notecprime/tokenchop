// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;

interface ITokenChopPoolFactory {
    function createPool(address _base, address _quote) external returns (address poolAddr);
    function initialize(address _base, address _quote, address _poolAddr, address _sisterAddr) external;
}
