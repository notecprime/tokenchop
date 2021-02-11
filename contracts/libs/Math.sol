// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

library Math {

    function max(int256 a, int256 b) internal pure returns (int256) {
        return a >= b ? a : b;
    }    

    function percent(uint256 numerator, uint256 denominator, uint8 decimals) internal pure returns(uint256 value) {
        uint _numerator  = numerator * 10 ** (decimals + 1);
        uint _quotient =  ((_numerator / denominator) + 5) / 10; // with rounding of last digit
        return ( _quotient);
    }    

    function mulDiv(uint256 value, uint256 numerator, uint256 denominator) internal pure returns (uint256) {
        require(value < 2**128);
        require(numerator < 2**128);
        require(numerator <= denominator);
        return (value * numerator) / denominator;
    }

    function quoteToBase(uint price, uint amount) internal pure returns (uint256) {
        return Math.mulDiv(_amount, _price, 10**18);
    }

    function baseToQuote(uint _price, uint _amount) internal pure returns (uint256) {
        return Math.mulDiv(_amount, 10**18, _price);
    }

// pragma solidity 0.5.9;

// import "openzeppelin-solidity/contracts/math/SafeMath.sol";


// /// "Fractional" library facilitate fixed point decimal computation. In Band Protocol, fixed point decimal can be
// /// represented using `uint256` data type. The decimal is fixed at 18 digits and `mulFrac` can be used to multiply
// /// the fixed point decimal with an ordinary `uint256` value.
// library Fractional {
//   using SafeMath for uint256;
//   uint256 internal constant DENOMINATOR = 1e18;

//   function getDenominator() internal pure returns (uint256) {
//     return DENOMINATOR;
//   }

//   function mulFrac(uint256 numerator, uint256 value) internal pure returns(uint256) {
//     return numerator.mul(value).div(DENOMINATOR);
//   }
// }

}