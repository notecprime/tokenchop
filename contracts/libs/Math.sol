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

    // todo find something better
    // https://medium.com/coinmonks/math-in-solidity-part-3-percents-and-proportions-4db014e080b1
    // x*y/z
    function mulDiv (uint256 x, uint256 y, uint256 z) public pure returns (uint256) {
        uint a = x / z; uint b = x % z; // x = a * z + b
        uint c = y / z; uint d = y % z; // y = c * z + d
        return a * b * z + a * d + b * c + b * d / z;
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

    // function mulDiv(
    //     uint256 value,
    //     uint256 numerator,
    //     uint256 denominator
    // )
    //     internal
    //     constant
    //     returns (uint256)
    // {
    //     require(value < 2**128);
    //     require(numerator < 2**128);
    //     require(numerator <= denominator);
    //     return (value * numerator) / denominator;
    // }
}