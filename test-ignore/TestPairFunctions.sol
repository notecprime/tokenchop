// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/libs/PairFunctions.sol";

contract TestPairFunctions {

    uint256 SLICE_POINT = 50000000; // 0.50

    int256 FEE1 = 1 * 10**8 / 100;
    uint256 HIGH_BALANCE1 = 2 ether;
    uint256 LOW_BALANCE1 = 2 ether;

    uint256 S1_CHANGE = 25 * 10**8 / 100;
    int256 S1_PROFIT_SPLIT = 0;
    uint256 S1_REBALANCE_PERCENTAGE = 0;

    uint256 S2_CHANGE = 80 * 10**8 / 100;
    int256 S2_PROFIT_SPLIT = 0;
    uint256 S2_REBALANCE_PERCENTAGE = 60 * 10**8 / 100;

    uint256 S3_CHANGE = 125 * 10**8 / 100;
    int256 S3_PROFIT_SPLIT = 0.25 * 10**8 / 100;
    uint256 S3_REBALANCE_PERCENTAGE = 150 * 10**8 / 100;

    uint256 S4_CHANGE = 500 * 10**8 / 100;
    int256 S4_PROFIT_SPLIT = 4 * 10**8 / 100;
    uint256 S4_REBALANCE_PERCENTAGE = 900 * 10**8 / 100;

    function testPriceChange() public {
        uint256 result = PairFunctions.priceChange(2000, 1000);
        Assert.equal(result, 50 * 10**8 / 100, "priceChange is incorrect");
    }

    function testCalculateProfitSplitS1() public {
        int256 result = PairFunctions.calculateProfitSplit(FEE1, S1_CHANGE);
        Assert.equal(result, S1_PROFIT_SPLIT, "calculateProfitSplit is incorrect");
    }

    function testCalculateProfitSplitS2() public {
        int256 result = PairFunctions.calculateProfitSplit(FEE1, S2_CHANGE);
        Assert.equal(result, S2_PROFIT_SPLIT, "calculateProfitSplit is incorrect");
    }

    function testCalculateProfitSplitS3() public {
        int256 result = PairFunctions.calculateProfitSplit(FEE1, S3_CHANGE);
        Assert.equal(result, S3_PROFIT_SPLIT, "calculateProfitSplit is incorrect");
    }

    function testCalculateProfitSplitS4() public {
        int256 result = PairFunctions.calculateProfitSplit(FEE1, S4_CHANGE);
        Assert.equal(result, S4_PROFIT_SPLIT, "calculateProfitSplit is incorrect");
    }

    function testCalculateRebalancePercentageS1() public {
        uint256 result = PairFunctions.calculateRebalancePercentage(S1_CHANGE, SLICE_POINT);
        Assert.equal(result, S1_REBALANCE_PERCENTAGE, "calculateRebalancePercentage is incorrect");
    }

    function testCalculateRebalancePercentageS2() public {
        uint256 result = PairFunctions.calculateRebalancePercentage(S2_CHANGE, SLICE_POINT);
        Assert.equal(result, S2_REBALANCE_PERCENTAGE, "calculateRebalancePercentage is incorrect");
    }

    function testCalculateRebalancePercentageS3() public {
        uint256 result = PairFunctions.calculateRebalancePercentage(S3_CHANGE, SLICE_POINT);
        Assert.equal(result, S3_REBALANCE_PERCENTAGE, "calculateRebalancePercentage is incorrect");
    }

    function testCalculateRebalancePercentageS4() public {
        uint256 result = PairFunctions.calculateRebalancePercentage(S4_CHANGE, SLICE_POINT);
        Assert.equal(result, S4_REBALANCE_PERCENTAGE, "calculateRebalancePercentage is incorrect");
    }

    function testCalculateHighClosingTokensS1() public {
        uint256 result = PairFunctions.calculateHighClosingTokens(
            HIGH_BALANCE1, S1_PROFIT_SPLIT, S1_REBALANCE_PERCENTAGE, S1_CHANGE
        );
        uint256 expected = 0;
        Assert.equal(result, expected, "calculateHighClosingTokens is incorrect");
    }

    function testCalculateHighClosingTokensS2() public {
        uint256 result = PairFunctions.calculateHighClosingTokens(
            HIGH_BALANCE1, S2_PROFIT_SPLIT, S2_REBALANCE_PERCENTAGE, S2_CHANGE
        );
        uint256 expected = 1.5 ether;
        Assert.equal(result, expected, "calculateHighClosingTokens is incorrect");
    }

    function testCalculateHighClosingTokensS3() public {
        uint256 result = PairFunctions.calculateHighClosingTokens(
            HIGH_BALANCE1, S3_PROFIT_SPLIT, S3_REBALANCE_PERCENTAGE, S3_CHANGE
        );
        uint256 expected = 2.396 ether;
        Assert.equal(result, expected, "calculateHighClosingTokens is incorrect");
    }

    function testCalculateHighClosingTokensS4() public {
        uint256 result = PairFunctions.calculateHighClosingTokens(
            HIGH_BALANCE1, S4_PROFIT_SPLIT, S4_REBALANCE_PERCENTAGE, S4_CHANGE
        );
        uint256 expected = 3.584 ether;
        Assert.equal(result, expected, "calculateHighClosingTokens is incorrect");
    }

    function testCalculateLowClosingTokensS1() public {
        uint256 result = PairFunctions.calculateLowClosingTokens(
            LOW_BALANCE1, S1_PROFIT_SPLIT, S1_REBALANCE_PERCENTAGE, S1_CHANGE
        );
        uint256 expected = 4 ether;
        Assert.equal(result, expected, "testCalculateLowClosingTokens is incorrect");
    }

    function testCalculateLowClosingTokensS2() public {
        uint256 result = PairFunctions.calculateLowClosingTokens(
            LOW_BALANCE1, S2_PROFIT_SPLIT, S2_REBALANCE_PERCENTAGE, S2_CHANGE
        );
        uint256 expected = 2.50 ether;
        Assert.equal(result, expected, "testCalculateLowClosingTokens is incorrect");
    }

    function testCalculateLowClosingTokensS3() public {
         uint256 result = PairFunctions.calculateLowClosingTokens(
            LOW_BALANCE1, S3_PROFIT_SPLIT, S3_REBALANCE_PERCENTAGE, S3_CHANGE
        );
        uint256 expected = 1.604 ether;
        Assert.equal(result, expected, "testCalculateLowClosingTokens is incorrect");
    }

    function testCalculateLowClosingTokensS4() public {
        uint256 result = PairFunctions.calculateLowClosingTokens(
            LOW_BALANCE1, S4_PROFIT_SPLIT, S4_REBALANCE_PERCENTAGE, S4_CHANGE
        );
        uint256 expected = 0.416 ether;
        Assert.equal(result, expected, "testCalculateLowClosingTokens is incorrect");
    }        

}