const TokenChopFactory = artifacts.require("TokenChopFactory");

const WBNB = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
const ETH = '0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378';
const BTC = '0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8';
const XRP = '0xa83575490D7df4E2F47b7D38ef351a2722cA45b9';
const DAI = '0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867';
const BUSD = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee';

module.exports = async function(deployer, network, accounts) {
  const factory = await TokenChopFactory.deployed();
  await factory.createPair(WBNB, BUSD);
  if (network !== 'development') {
    await factory.createPair(ETH, BUSD);
    await factory.createPair(BTC, BUSD);
    await factory.createPair(XRP, BUSD);
    await factory.createPair(DAI, BUSD);
  }  
};
