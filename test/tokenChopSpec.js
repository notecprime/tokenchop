const TokenChopSpec = artifacts.require("TokenChopSpec");
const TokenChopFactory = artifacts.require("TokenChopFactory");
const IBEP20 = artifacts.require("IBEP20");

const utils = require('ethers').utils
const expectedThrow = require('./helpers/expectedThrow');

const BNB = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
const BUSD = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee';

contract("TokenChopSpec", accounts => {
  // it("should have a name", async () => {
  //   const factory = await TokenChopFactory.deployed();
  //   const instance = await TokenChopSpec.at(await factory.allStable(0));
  //   const name = await instance.name();
  //   assert.equal(name, 'TokenChop: BNB/BUSD Stable');
  // });

  // it("should have a symbol", async () => {
  //   const factory = await TokenChopFactory.deployed();
  //   const instance = await TokenChopSpec.at(await factory.allStable(0));
  //   const symbol = await instance.symbol();
  //   assert.equal(symbol, 'BNBBUSD0');
  // });

  // it("should have a sister", async () => {
  //   const factory = await TokenChopFactory.deployed();
  //   const instance = await TokenChopSpec.at(await factory.allStable(0));
  //   const sisterAddr = await factory.allSpec(0);
  //   const sister = await instance.sister();
  //   assert.equal(sister, sisterAddr);
  // });  

  // it("should have a baseSymbol", async () => {
  //   const factory = await TokenChopFactory.deployed();
  //   const instance = await TokenChopSpec.at(await factory.allStable(0));
  //   const base = await instance.baseSymbol();
  //   assert.equal(base, 'BNB');
  // });  

  // it("should have a quoteSymbol", async () => {
  //   const factory = await TokenChopFactory.deployed();
  //   const instance = await TokenChopSpec.at(await factory.allStable(0));
  //   const quote = await instance.quoteSymbol();
  //   assert.equal(quote, 'BUSD');
  // });  


  // it("can mint a stable token once transfer funds approved", async () => {
  //   const factory = await TokenChopFactory.deployed();
  //   const stableAddr = await factory.allStable(0);
  //   const instance = await TokenChopSpec.at(stableAddr);
  //   const bnbInstance = await IBEP20.at(BNB);
  //   const amount = web3.utils.toBN(web3.utils.toWei('0.0001'));
  //   let bnbBalance = await bnbInstance.balanceOf(accounts[0]);
  //   let collateral = await instance.collateral();
  //   let balance = await instance.balanceOf(accounts[0]);
  //   console.log('BNBBalanceStart: ' + bnbBalance.toString());
  //   console.log('CollateralStart: ' + collateral.toString());
  //   console.log('BalanceStart: ' + balance.toString());
  //   await bnbInstance.approve(stableAddr, amount);
  //   try {
  //     await instance.mint(amount);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   let afterMintBnbBalance = await bnbInstance.balanceOf(accounts[0]);
  //   let afterMintCollateral = await instance.collateral();    
  //   let afterMintBalance = await instance.balanceOf(accounts[0]);
  //   console.log('BNBBalanceAfterMint: ' + afterMintBnbBalance.toString());    
  //   console.log('CollateralAfterMint: ' + afterMintCollateral.toString());      
  //   console.log('BalanceAfterMint: ' + afterMintBalance.toString());    
  //   // assert.isTrue(afterMintBnbBalance.eq(bnbBalance.sub(amount)));
  //   // assert.isTrue(afterMintCollateral.eq(collateral.add(amount)));
  //   // assert.isTrue(afterMintBalance.eq(balance.add(amount)));    
  //   await instance.burn(amount);
  //   await instance.burn(amount);
  //   await instance.burn(amount);
  //   await instance.burn(amount);
  //   await instance.burn(amount);
  //   await instance.burn(amount);
  //   let afterWithdrawBnbBalance = await bnbInstance.balanceOf(accounts[0]);
  //   let afterWithdrawCollateral = await instance.collateral();
  //   let afterWithdrawBalance = await instance.balanceOf(accounts[0]);
  //   console.log('BNBBalanceAfterWithdraw: ' + afterWithdrawBnbBalance.toString());    
  //   console.log('CollateralAfterWithdraw: ' + afterWithdrawCollateral.toString());    
  //   console.log('BalanceAfterWithdraw: ' + afterWithdrawBalance.toString());    
  //   // assert.isTrue(afterWithdrawBnbBalance.eq(afterMintBnbBalance.add(amount)));
  //   // assert.isTrue(afterWithdrawCollateral.eq(afterMintCollateral.sub(amount)));
  //   // assert.isTrue(afterWithdrawBalance.eq(afterMintBalance.sub(amount)));
  // });

  // // it("mintLowToken can transfer once funds approved", async () => {
  // //   const instance = await TokenChopFactory.deployed();
  // //   const pairAddr = await instance.allPairs(0);
  // //   const pairInstance = await TokenChopPair.at(pairAddr);
  // //   const ethInstance = await IERC20.at(ETH);
  // //   const amount = web3.utils.toBN(web3.utils.toWei('0.0001'));
  // //   let ethBalance = await ethInstance.balanceOf(accounts[0]);
  // //   let pairBalance = await pairInstance.lowBalanceOf(accounts[0]);    
  // //   //console.log('EthBalanceStart: ' + ethBalance.toString());
  // //   //console.log('PairBalanceStart: ' + pairBalance.toString());
  // //   await ethInstance.approve(pairAddr, amount);
  // //   await pairInstance.mintLowToken(amount);
  // //   afterMintEthBalance = await ethInstance.balanceOf(accounts[0]);
  // //   afterMintPairBalance = await pairInstance.lowBalanceOf(accounts[0]);    
  // //   assert.isTrue(afterMintEthBalance.eq(ethBalance.sub(amount)));
  // //   assert.isTrue(afterMintPairBalance.eq(pairBalance.add(amount)));
  // //   //console.log('EthBalanceAfterMint: ' + ethBalance.toString());    
  // //   //console.log('PairBalanceAfterMint: ' + pairBalance.toString());    
  // //   await pairInstance.withdrawLow(amount);
  // //   afterWithdrawEthBalance = await ethInstance.balanceOf(accounts[0]);
  // //   afterWithdrawPairBalance = await pairInstance.lowBalanceOf(accounts[0]);
  // //   assert.isTrue(afterWithdrawEthBalance.eq(afterMintEthBalance.add(amount)));
  // //   assert.isTrue(afterWithdrawPairBalance.eq(afterMintPairBalance.sub(amount)));
  // //   //console.log('EthBalanceAfterWithdraw: ' + ethBalance.toString());    
  // //   //console.log('PairBalanceAfterWithdraw: ' + pairBalance.toString());    
  // // });

  // // it("should throw if setClosePrice called with 0", async () => {
  // //   const tokenChopPairInstance = await TokenChopPair.deployed();
  // //   await expectedThrow(tokenChopPairInstance.setClosePrice(0));
  // // });

  // // it("setClosePrice should work", async () => {
  // //   let tokenChopPairInstance = await TokenChopPair.deployed();
  // //   let closePrice = await tokenChopPairInstance.closePrice.call();
  // //   assert.equal(closePrice.toString(), '0', "starting closePrice should be 0");
  // //   await tokenChopPairInstance.setClosePrice(utils.parseUnits("625", 18))
  // //   closePrice = await tokenChopPairInstance.closePrice.call();
  // //   assert.equal(closePrice.toString(), utils.parseUnits("625", 18), "new closePrice should be 625*10**18");
  // // });

});
