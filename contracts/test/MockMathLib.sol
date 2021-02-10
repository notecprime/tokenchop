// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;

import "../libs/Math.sol";

contract MockMathLib {

    function mulDiv(uint256 value, uint256 numerator, uint256 denominator) external view returns (uint256) {
        return Math.mulDiv(value, numerator, denominator);
    }

}
