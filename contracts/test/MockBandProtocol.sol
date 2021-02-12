// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;
pragma abicoder v2;

contract MockBandProtocol {

    uint256 public price;

    struct ReferenceData {
        uint256 rate;
        uint256 lastUpdatedBase;
        uint256 lastUpdatedQuote;
    }

    function getReferenceData(string memory _base, string memory _quote) external view returns (ReferenceData memory) {
        return ReferenceData(price, block.timestamp, block.timestamp);
    }

    function setPrice(uint256 _price) public {
        price = _price;
    }

}
