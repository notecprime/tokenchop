const MockBandProtocol = artifacts.require("MockBandProtocol");
const math = require('./helpers/math');

contract("MockBandProtocol", accounts => {

  it("setPrice Changes Mock Price", async () => {
    const instance = await MockBandProtocol.deployed();
    const price1 = '72.12';
    const price2 = '74.92';
    const price3 = '0.12';
    await instance.setPrice(math.fromEth(price1));
    let data1 = await instance.getReferenceData('A','B');
    assert.equal(math.toEth(data1.rate), price1);
    await instance.setPrice(math.fromEth(price2));
    let data2 = await instance.getReferenceData('A','B');
    assert.equal(math.toEth(data2.rate), price2);
    await instance.setPrice(math.fromEth(price3));
    let data3 = await instance.getReferenceData('A','B');
    assert.equal(math.toEth(data3.rate), price3);
  });

});
