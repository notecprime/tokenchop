// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import './SafeMath.sol';

library Math {
    using SafeMath for uint256;

    function percent(uint256 numerator, uint256 denominator, uint8 decimals) internal pure returns(uint256 value) {
        uint _numerator  = numerator * 10 ** (decimals + 1);
        uint _quotient =  ((_numerator / denominator) + 5) / 10; // with rounding of last digit
        return ( _quotient);
    }    

    function mulDiv(uint256 value, uint256 numerator, uint256 denominator) internal pure returns (uint256) {
        require(value < 2**128, "Value too large");
        require(numerator < 2**128, "Numerator too large ");
        return value.mul(numerator).div(denominator);
    }

    function quoteToBase(uint256 price, uint256 amount) internal pure returns (uint256) {
        require(price != 0, "price must not be 0");
        return Math.mulDiv(amount, 10**18, price);
    }

    function baseToQuote(uint256 price, uint256 amount) internal pure returns (uint256) {
        return Math.mulDiv(amount, price, 10**18);
    }

    function supplyToBase(uint256 totalSupply, uint256 totalCollateral, uint256 supplyAmount) internal pure returns (uint256) {
        require(totalSupply != 0, "supplyAmount must not be 0");
        return Math.mulDiv(supplyAmount, totalCollateral, totalSupply);
    }

    function baseToSupply(uint256 totalSupply, uint256 totalCollateral, uint256 baseAmount) internal pure returns (uint256) {
        require(totalCollateral != 0, "totalCollateral must not be 0");
        return Math.mulDiv(baseAmount, totalSupply, totalCollateral);
    }
}