const Math = artifacts.require("Math");
const TokenChopFactory = artifacts.require("TokenChopFactory");
const TokenChopSpecFactory = artifacts.require("TokenChopSpecFactory");
const TokenChopStableFactory = artifacts.require("TokenChopStableFactory");
const MockMathLib = artifacts.require("MockMathLib");
const MockBandProtocol = artifacts.require("MockBandProtocol");
let bandProtocolAddr = '0xDA7a001b254CD22e46d3eAB04d937489c93174C3';

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Math);
  if (network === 'development') {  
    await deployer.link(Math, MockMathLib);
    await deployer.deploy(MockMathLib);
    await deployer.deploy(MockBandProtocol);
    bandProtocolAddr = MockBandProtocol.address;    
  }
  await deployer.link(Math, TokenChopFactory);
  await deployer.deploy(TokenChopFactory, accounts[0]);
  await deployer.deploy(TokenChopSpecFactory, TokenChopFactory.address);
  await deployer.deploy(TokenChopStableFactory, TokenChopFactory.address, bandProtocolAddr);
  const factory = await TokenChopFactory.deployed();
  await factory.setPoolFactories(TokenChopStableFactory.address, TokenChopSpecFactory.address, { from: accounts[0] });
};
