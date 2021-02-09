// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TokenChopFactory.sol";

contract TestTokenChopFactory {
    function testFeeToSetter() public {
        TokenChopFactory factory = TokenChopFactory(DeployedAddresses.TokenChopFactory());
        Assert.notEqual(factory.feeToSetter(), address(0), "Fee to setter should not be empty");
    }
}