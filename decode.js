console.log('hw')
console.log('hw')
const Web3 = require('web3');
let web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
console.log('hw')
const data = '0x40c10f1900000000000000000000000068200648df134d08a589b927ad9e85d50db74e540000000000000000000000000000000000000000000000001bc16d674ec80000';

web3.eth.abi.decodeLog([
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ], data);