// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "./Math.sol";

library PairFunctions {

    uint8 public constant CHANGE_DECIMALS = 8;

    function priceChange(uint256 _openPrice, uint256 _closePrice) public pure returns(uint256 change) {
        return Math.percent(_closePrice, _openPrice, CHANGE_DECIMALS);
    }

    function calculateProfitSplit(int256 _fee, uint256 _change) public pure returns (int256 profitSplit) {
        int256 signedChange = int256(_change);
        return _fee * Math.max(signedChange - int256(10**CHANGE_DECIMALS), 0) / int256(10**CHANGE_DECIMALS);
    }

    function calculateRebalancePercentage(uint256 _change, uint256 _slicePoint) public pure returns (uint256 rebalancePercentage) {
        int256 cBySp = int256(Math.percent(_change, _slicePoint, CHANGE_DECIMALS)) - int256(10**CHANGE_DECIMALS);
        return uint256(Math.max(cBySp, 0));
    }

    function calculateHighClosingTokens(
        uint256 _highBalance,
        int256 _profitSplit,
        uint256 _rebalance,
        uint256 _change
    ) public pure returns (uint256 closingTokens) {
        return _highBalance * uint256(int256(_rebalance) - _profitSplit) / _change;
    }

    function calculateLowClosingTokens(
        uint256 _lowBalance,
        int256 _profitSplit,
        uint256 _rebalance,
        uint256 _change
    ) public pure returns (uint256 closingTokens) {
        int256 rbPsForDiv = (int256(_rebalance) - _profitSplit) * int256(10**CHANGE_DECIMALS);
        return _lowBalance * (2*10**CHANGE_DECIMALS - uint256(rbPsForDiv) / _change) / 10**CHANGE_DECIMALS;
    }

}