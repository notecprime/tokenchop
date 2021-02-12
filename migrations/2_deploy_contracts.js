const Math = artifacts.require("Math");
const TokenChopFactory = artifacts.require("TokenChopFactory");
const MockMathLib = artifacts.require("MockMathLib");
const MockBandProtocol = artifacts.require("MockBandProtocol");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Math);
  await deployer.link(Math, MockMathLib);
  await deployer.deploy(MockMathLib);
  await deployer.deploy(MockBandProtocol);
  await deployer.link(Math, TokenChopFactory);
  await deployer.deploy(TokenChopFactory, accounts[0], MockBandProtocol.address);
};