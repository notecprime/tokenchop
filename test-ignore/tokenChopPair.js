const TokenChopPair = artifacts.require("TokenChopPair");
const utils = require('ethers').utils
const expectedThrow = require('./helpers/expectedThrow');

contract("TokenChopPair", accounts => {
  it("should not have high or low address set", async () => {
    const tokenChopPairInstance = await TokenChopPair.deployed();
    const highAddress = await tokenChopPairInstance.highToken.call();
    const lowAddress = await tokenChopPairInstance.lowToken.call();
    assert.equal(highAddress, '0x0000000000000000000000000000000000000000', "highAddress is not default");
    assert.equal(lowAddress, '0x0000000000000000000000000000000000000000', "lowAddress is not default");
  });

  it("should have open price", async () => {
    const tokenChopPairInstance = await TokenChopPair.deployed();
    const openPrice = await tokenChopPairInstance.openPrice.call();
    assert.equal(openPrice.toString(), utils.parseUnits("2500", 18), "openPrice is not 2500");
  });

  it("should have fee", async () => {
    const tokenChopPairInstance = await TokenChopPair.deployed();
    const fee = await tokenChopPairInstance.fee.call();
    assert.equal(fee.toString(), '1000000', "fee is not 0.01");
  });

  it("should throw if setClosePrice called with 0", async () => {
    const tokenChopPairInstance = await TokenChopPair.deployed();
    await expectedThrow(tokenChopPairInstance.setClosePrice(0));
  });

  it("setClosePrice should work", async () => {
    let tokenChopPairInstance = await TokenChopPair.deployed();
    let closePrice = await tokenChopPairInstance.closePrice.call();
    assert.equal(closePrice.toString(), '0', "starting closePrice should be 0");
    await tokenChopPairInstance.setClosePrice(utils.parseUnits("625", 18))
    closePrice = await tokenChopPairInstance.closePrice.call();
    assert.equal(closePrice.toString(), utils.parseUnits("625", 18), "new closePrice should be 625*10**18");
  });

});
