const TokenChopStable = artifacts.require("TokenChopStable");
const TokenChopFactory = artifacts.require("TokenChopFactory");
const IBEP20 = artifacts.require("IBEP20");

const utils = require('ethers').utils
const expectedThrow = require('./helpers/expectedThrow');
const math = require('./helpers/math');

const BNB = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
const BUSD = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee';

contract("TokenChopStable", accounts => {
  it("should have a name", async () => {
    const factory = await TokenChopFactory.deployed();
    const instance = await TokenChopStable.at(await factory.allStable(0));
    const name = await instance.name();
    assert.equal(name, 'TokenChop: BNB/BUSD Stable');
  });

  it("should have a symbol", async () => {
    const factory = await TokenChopFactory.deployed();
    const instance = await TokenChopStable.at(await factory.allStable(0));
    const symbol = await instance.symbol();
    assert.equal(symbol, 'BNBBUSD0');
  });

  it("should have a sister", async () => {
    const factory = await TokenChopFactory.deployed();
    const instance = await TokenChopStable.at(await factory.allStable(0));
    const sisterAddr = await factory.allSpec(0);
    const sister = await instance.sister();
    assert.equal(sister, sisterAddr);
  });  

  it("should have a baseSymbol", async () => {
    const factory = await TokenChopFactory.deployed();
    const instance = await TokenChopStable.at(await factory.allStable(0));
    const base = await instance.baseSymbol();
    assert.equal(base, 'BNB');
  });  

  it("should have a quoteSymbol", async () => {
    const factory = await TokenChopFactory.deployed();
    const instance = await TokenChopStable.at(await factory.allStable(0));
    const quote = await instance.quoteSymbol();
    assert.equal(quote, 'BUSD');
  });  


  it("can mint a stable token once transfer funds approved", async () => {
    const factory = await TokenChopFactory.deployed();
    const stableAddr = await factory.allStable(0);
    const instance = await TokenChopStable.at(stableAddr);
    const bnbInstance = await IBEP20.at(BNB);
    const amount = web3.utils.toBN(web3.utils.toWei('0.0001'));
    let bnbBalance = await bnbInstance.balanceOf(accounts[0]);
    let collateral = await instance.collateral();
    let balance = await instance.balanceOf(accounts[0]);
    console.log('BNBBalanceStart: ' + bnbBalance.toString());
    console.log('CollateralStart: ' + collateral.toString());
    console.log('BalanceStart: ' + balance.toString());
    await bnbInstance.approve(stableAddr, amount);
    await instance.mintAtBaseAmount(amount);
    let afterMintBnbBalance = await bnbInstance.balanceOf(accounts[0]);
    let afterMintCollateral = await instance.collateral();    
    let afterMintBalance = await instance.balanceOf(accounts[0]);
    let afterMintPrice = await instance.price();
    let quote = math.baseToQuote(afterMintPrice, amount);
    console.log('BNBBalanceAfterMint: ' + afterMintBnbBalance.toString());    
    console.log('CollateralAfterMint: ' + afterMintCollateral.toString());      
    console.log('BalanceAfterMint: ' + afterMintBalance.toString());    
    console.log('PriceAfterMint: ' + web3.utils.fromWei(afterMintPrice).toString());    
    assert.isTrue(afterMintBnbBalance.eq(bnbBalance.sub(amount)));
    assert.isTrue(afterMintCollateral.eq(collateral.add(amount)));
    assert.isTrue(afterMintBalance.eq(balance.add(quote)));
    await instance.burn(quote);
    let afterWithdrawBnbBalance = await bnbInstance.balanceOf(accounts[0]);
    let afterWithdrawCollateral = await instance.collateral();
    let afterWithdrawBalance = await instance.balanceOf(accounts[0]);
    console.log('BNBBalanceAfterWithdraw: ' + afterWithdrawBnbBalance.toString());    
    console.log('CollateralAfterWithdraw: ' + afterWithdrawCollateral.toString());    
    console.log('BalanceAfterWithdraw: ' + afterWithdrawBalance.toString());    
    // assert.isTrue(afterWithdrawBnbBalance.eq(afterMintBnbBalance.add(amount)));
    // assert.isTrue(afterWithdrawCollateral.eq(afterMintCollateral.sub(amount)));
    // assert.isTrue(afterWithdrawBalance.eq(afterMintBalance.sub(amount)));
  });
});
