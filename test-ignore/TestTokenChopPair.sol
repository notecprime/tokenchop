// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TokenChopPair.sol";

contract TestTokenChopPair {
    function testHighAddress() public {
        TokenChopPair pair = TokenChopPair(DeployedAddresses.TokenChopPair());
        Assert.equal(pair.highToken(), address(0), "High address should be empty");
    }

    function testLowAddress() public {
        TokenChopPair pair = TokenChopPair(DeployedAddresses.TokenChopPair());
        Assert.equal(pair.lowToken(), address(0), "low address not empty");
    }

    function testGetHighTokensS1() public {
        TokenChopPair pair = TokenChopPair(DeployedAddresses.TokenChopPair());
        pair.setClosePrice(625 ether);
        uint result = pair.getHighTokens();
        Assert.equal(result, 0, "get high tokens result is bad");
    }

    function testGetHighTokensS2() public {
        TokenChopPair pair = TokenChopPair(DeployedAddresses.TokenChopPair());
        pair.setClosePrice(2000 ether);
        uint result = pair.getHighTokens();
        Assert.equal(result, 1500000, "get high tokens result is bad");
    }

    function testGetHighTokensS3() public {
        TokenChopPair pair = TokenChopPair(DeployedAddresses.TokenChopPair());
        pair.setClosePrice(3125 ether);
        uint result = pair.getHighTokens();
        Assert.equal(result, 2396000, "get high tokens result is bad");
    }

    function testGetHighTokensS4() public {
        TokenChopPair pair = TokenChopPair(DeployedAddresses.TokenChopPair());
        pair.setClosePrice(12500 ether);
        uint result = pair.getHighTokens();
        Assert.equal(result, 3584000, "get high tokens result is bad");
    }

}