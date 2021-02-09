const Math = artifacts.require("Math");
const PairFunctions = artifacts.require("PairFunctions");
const TokenChopFactory = artifacts.require("TokenChopFactory");
const TokenChopToken = artifacts.require("TokenChopFactory");

const BNB = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
const ETH = '0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378';
const BTC = '0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8';
const XRP = '0xa83575490D7df4E2F47b7D38ef351a2722cA45b9';
const DAI = '0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867';
const BUSD = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee';

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(PairFunctions);
  await deployer.deploy(Math);
  await deployer.link(PairFunctions, TokenChopFactory);
  await deployer.link(Math, TokenChopFactory);
  await deployer.deploy(TokenChopFactory, accounts[0]);
  const factory = await TokenChopFactory.deployed();
  await factory.createPair(BNB, BUSD);
  //await factory.createPair(ETH, BUSD);
  //await factory.createPair(BTC, BUSD);
  //await factory.createPair(XRP, BUSD);
  //await factory.createPair(DAI, BUSD);
};

// var utils = require('ethers').utils
// const erc20 = require('@openzeppelin/contracts/build/contracts/ERC20PresetMinterPauser.json')
// const contract = require('@truffle/contract');
// const ERC20 = contract(erc20);

// ERC20.setProvider(this.web3._provider);

// module.exports = function(deployer, network, accounts) {
//   deployer.deploy(PairFunctions);
//   deployer.link(PairFunctions, TokenChopPair);
//   deployer.deploy(TokenChopPair, utils.parseUnits("2500", 18), utils.parseUnits("0.01", 8));
//   deployer.deploy(ERC20, "First Token", "FT", {from: accounts[0]});
//   deployer.deploy(ERC20, "Second Token", "ST", {from: accounts[0]});
// };