// SPDX-License-Identifier: MIT
// FROM https://github.com/bandprotocol/bandchain/blob/4aabd1a19070dadc8bc0287c56a944177f81f318/bridges/evm/contracts/stdref/IStdReference.sol
pragma solidity 0.7.6;
pragma experimental ABIEncoderV2;

interface IStdReference {
    struct ReferenceData {
        uint256 rate; // base/quote exchange rate, multiplied by 1e18.
        uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
        uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
    }

    function getReferenceData(string memory _base, string memory _quote)
        external
        view
        returns (ReferenceData memory);

    function getReferenceDataBulk(string[] memory _bases, string[] memory _quotes)
        external
        view
        returns (ReferenceData[] memory);
}