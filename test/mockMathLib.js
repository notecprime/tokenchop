const MockMathLib = artifacts.require("MockMathLib");

contract("MockMathLib", accounts => {

  it("mulDiv should give identity", async () => {
    const instance = await MockMathLib.deployed();
    const a = web3.utils.toBN(web3.utils.toWei('0.0001'));
    assert.equal((await instance.mulDiv(a, a, a)).toString(), a.toString());
  });

  it("mulDiv should give correct answer 1", async () => {
    const instance = await MockMathLib.deployed();
    const a = web3.utils.toBN(web3.utils.toWei('20'));
    const b = web3.utils.toBN(web3.utils.toWei('5'));
    const c = web3.utils.toBN(web3.utils.toWei('100'));
    const answer = web3.utils.toBN(web3.utils.toWei('1'));
    assert.equal((await instance.mulDiv(a, b, c)).toString(), answer.toString());
  });

  it("mulDiv should give correct answer 2", async () => {
    const instance = await MockMathLib.deployed();
    const a = web3.utils.toBN(web3.utils.toWei('20'));
    const b = web3.utils.toBN(web3.utils.toWei('5'));
    const c = web3.utils.toBN(web3.utils.toWei('250'));
    const answer = web3.utils.toBN(web3.utils.toWei('0.4'));
    assert.equal((await instance.mulDiv(a, b, c)).toString(), answer.toString());
  });


});
