const TokenChopFactory = artifacts.require("TokenChopFactory");

const BUSD = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee';
const ETH = '0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378';

contract("TokenChopFactory", accounts => {
  it("feeToSetter should be account[0]", async () => {
    const instance = await TokenChopFactory.deployed();
    assert.equal(await instance.feeToSetter(), accounts[0], "Should be account[0]");
  });

  it("createPair should create a pair ETH/BUSD", async () => {
    const instance = await TokenChopFactory.deployed();
    const startLength = await instance.allPairsLength();    
    assert.equal(startLength.toString(), '1', "expected no pairs to start with");
    const pair = await instance.createPair(ETH, BUSD);
    const idx = pair.logs[0].args[4].toNumber() - 1;
    const stableAddress = await instance.allStable(idx);
    const specAddress = await instance.allSpec(idx);
    assert.equal(pair.logs[0].event, 'PairCreated');
    assert.equal(pair.logs[0].args.base, ETH);
    assert.equal(pair.logs[0].args.quote, BUSD);
    assert.equal(pair.logs[0].args.stable, stableAddress);
    assert.equal(pair.logs[0].args.spec, specAddress);
    const finalLength = await instance.allPairsLength();
    assert.equal(finalLength.toString(), '2', "pair not created");
  });

  it("createPair should throw if pair exists", async () => {
    const instance = await TokenChopFactory.deployed();
    try {
      await instance.createPair(ETH, BUSD);
    } catch (err) {
      if (err.reason == 'TokenChop: STABLE_EXISTS') return;
      if (err.reason == 'TokenChop: SPEC_EXISTS') return;
      console.log(err);
      assert.fail('Unexpected revert reason');
    }
    assert.fail('No revert');
  });

  it("GetStableAddress(base, quote) returns the stable address", async () => {
    const instance = await TokenChopFactory.deployed();
    const address = await instance.allStable(1);
    const result = await instance.getStableAddress(ETH, BUSD);
    assert.equal(result, address);
  });

  it("GetSpecAddress(base, quote) returns the spec address", async () => {
    const instance = await TokenChopFactory.deployed();
    const address = await instance.allSpec(1);
    const result = await instance.getSpecAddress(ETH, BUSD);
    assert.equal(result, address);
  });  


  // it("mintHighToken can transfer once funds approved", async () => {
  //   const instance = await TokenChopFactory.deployed();
  //   const pairAddr = await instance.allPairs(0);
  //   const pairInstance = await TokenChopPair.at(pairAddr);
  //   const ethInstance = await IERC20.at(ETH);
  //   const amount = web3.utils.toBN(web3.utils.toWei('0.0001'));
  //   let ethBalance = await ethInstance.balanceOf(accounts[0]);
  //   let pairBalance = await pairInstance.highBalanceOf(accounts[0]);    
  //   //console.log('EthBalanceStart: ' + ethBalance.toString());
  //   //console.log('PairBalanceStart: ' + pairBalance.toString());
  //   await ethInstance.approve(pairAddr, amount);
  //   await pairInstance.mintHighToken(amount);
  //   afterMintEthBalance = await ethInstance.balanceOf(accounts[0]);
  //   afterMintPairBalance = await pairInstance.highBalanceOf(accounts[0]);    
  //   assert.isTrue(afterMintEthBalance.eq(ethBalance.sub(amount)));
  //   assert.isTrue(afterMintPairBalance.eq(pairBalance.add(amount)));
  //   //console.log('EthBalanceAfterMint: ' + ethBalance.toString());    
  //   //console.log('PairBalanceAfterMint: ' + pairBalance.toString());    
  //   await pairInstance.withdrawHigh(amount);
  //   afterWithdrawEthBalance = await ethInstance.balanceOf(accounts[0]);
  //   afterWithdrawPairBalance = await pairInstance.highBalanceOf(accounts[0]);
  //   assert.isTrue(afterWithdrawEthBalance.eq(afterMintEthBalance.add(amount)));
  //   assert.isTrue(afterWithdrawPairBalance.eq(afterMintPairBalance.sub(amount)));
  //   //console.log('EthBalanceAfterWithdraw: ' + ethBalance.toString());    
  //   //console.log('PairBalanceAfterWithdraw: ' + pairBalance.toString());    
  // });

  // it("mintLowToken can transfer once funds approved", async () => {
  //   const instance = await TokenChopFactory.deployed();
  //   const pairAddr = await instance.allPairs(0);
  //   const pairInstance = await TokenChopPair.at(pairAddr);
  //   const ethInstance = await IERC20.at(ETH);
  //   const amount = web3.utils.toBN(web3.utils.toWei('0.0001'));
  //   let ethBalance = await ethInstance.balanceOf(accounts[0]);
  //   let pairBalance = await pairInstance.lowBalanceOf(accounts[0]);    
  //   //console.log('EthBalanceStart: ' + ethBalance.toString());
  //   //console.log('PairBalanceStart: ' + pairBalance.toString());
  //   await ethInstance.approve(pairAddr, amount);
  //   await pairInstance.mintLowToken(amount);
  //   afterMintEthBalance = await ethInstance.balanceOf(accounts[0]);
  //   afterMintPairBalance = await pairInstance.lowBalanceOf(accounts[0]);    
  //   assert.isTrue(afterMintEthBalance.eq(ethBalance.sub(amount)));
  //   assert.isTrue(afterMintPairBalance.eq(pairBalance.add(amount)));
  //   //console.log('EthBalanceAfterMint: ' + ethBalance.toString());    
  //   //console.log('PairBalanceAfterMint: ' + pairBalance.toString());    
  //   await pairInstance.withdrawLow(amount);
  //   afterWithdrawEthBalance = await ethInstance.balanceOf(accounts[0]);
  //   afterWithdrawPairBalance = await pairInstance.lowBalanceOf(accounts[0]);
  //   assert.isTrue(afterWithdrawEthBalance.eq(afterMintEthBalance.add(amount)));
  //   assert.isTrue(afterWithdrawPairBalance.eq(afterMintPairBalance.sub(amount)));
  //   //console.log('EthBalanceAfterWithdraw: ' + ethBalance.toString());    
  //   //console.log('PairBalanceAfterWithdraw: ' + pairBalance.toString());    
  // });

  // it("should throw if setClosePrice called with 0", async () => {
  //   const tokenChopPairInstance = await TokenChopPair.deployed();
  //   await expectedThrow(tokenChopPairInstance.setClosePrice(0));
  // });

  // it("setClosePrice should work", async () => {
  //   let tokenChopPairInstance = await TokenChopPair.deployed();
  //   let closePrice = await tokenChopPairInstance.closePrice.call();
  //   assert.equal(closePrice.toString(), '0', "starting closePrice should be 0");
  //   await tokenChopPairInstance.setClosePrice(utils.parseUnits("625", 18))
  //   closePrice = await tokenChopPairInstance.closePrice.call();
  //   assert.equal(closePrice.toString(), utils.parseUnits("625", 18), "new closePrice should be 625*10**18");
  // });

});
