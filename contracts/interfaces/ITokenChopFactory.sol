// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;

interface ITokenChopFactory {
    event PairCreated(address indexed base, address indexed quote, address stable, address spec, uint256);

    function feeTo() external view returns (address);
    function feeToSetter() external view returns (address);

    function getStableAddress(address base, address quote) external view returns (address stable);
    function getSpecAddress(address base, address quote) external view returns (address spec);
    function allStable(uint256) external view returns (address stable);
    function allSpec(uint256) external view returns (address spec);
    function allPairsLength() external view returns (uint256);

    function createPair(address base, address quote) external returns (address stable, address spec);

    function setFeeTo(address) external;
    function setFeeToSetter(address) external;
}
