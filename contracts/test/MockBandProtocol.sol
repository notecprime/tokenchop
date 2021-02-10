// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;
pragma abicoder v2;

contract MockBandProtocol {

    struct ReferenceData {
        uint256 rate;
        uint256 lastUpdatedBase;
        uint256 lastUpdatedQuote;
    }

    function getReferenceData(string memory _base, string memory _quote) external view returns (ReferenceData memory) {
        uint pick = block.number % 6;
        ReferenceData[6] memory values = [
            ReferenceData(10000000, block.timestamp, block.timestamp),
            ReferenceData(20000000, block.timestamp, block.timestamp),
            ReferenceData(30000000, block.timestamp, block.timestamp),
            ReferenceData(40000000, block.timestamp, block.timestamp),           
            ReferenceData(50000000, block.timestamp, block.timestamp),           
            ReferenceData(60000000, block.timestamp, block.timestamp)
        ];
        return values[pick];
    }

}
