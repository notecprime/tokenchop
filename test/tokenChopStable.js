// const TokenChopStable = artifacts.require("TokenChopStable");
// const TokenChopFactory = artifacts.require("TokenChopFactory");
// const MockBandProtocol = artifacts.require("MockBandProtocol");
// const IBEP20 = artifacts.require("IBEP20");

// const utils = require('ethers').utils
// const expectedThrow = require('./helpers/expectedThrow');
// const math = require('./helpers/math');

// const BNB = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
// const BUSD = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee';

// const log = (stage, value) => {
//   console.log(`${stage} ${math.toEth(value).toString()}`);
// }

// const printLogs = tx => {
//   const logs = tx.logs.map(log => ({
//     event: log.event,
//     args: { ...log.args}
//   }));
//   logs.forEach(log => {
//     console.log(log);
//     console.log(log.args.value && log.args.value.toString())
//   });
// }

// const assertNearly = (actual, expected) => {
//   assert.isTrue(math.nearly(actual, expected), `${actual.toString()} is not ${expected.toString()}`);
// }

// contract("TokenChopStable", accounts => {
//   it("should have a name", async () => {
//     const factory = await TokenChopFactory.deployed();
//     const instance = await TokenChopStable.at(await factory.allStable(0));
//     const name = await instance.name();
//     assert.equal(name, 'TokenChop: BNB/BUSD Stable');
//   });

//   it("should have a symbol", async () => {
//     const factory = await TokenChopFactory.deployed();
//     const instance = await TokenChopStable.at(await factory.allStable(0));
//     const symbol = await instance.symbol();
//     assert.equal(symbol, 'BNBBUSD0');
//   });

//   it("should have a sister", async () => {
//     const factory = await TokenChopFactory.deployed();
//     const instance = await TokenChopStable.at(await factory.allStable(0));
//     const sisterAddr = await factory.allSpec(0);
//     const sister = await instance.sister();
//     assert.equal(sister, sisterAddr);
//   });  

//   it("should have a baseSymbol", async () => {
//     const factory = await TokenChopFactory.deployed();
//     const instance = await TokenChopStable.at(await factory.allStable(0));
//     const base = await instance.baseSymbol();
//     assert.equal(base, 'BNB');
//   });  

//   it("should have a quoteSymbol", async () => {
//     const factory = await TokenChopFactory.deployed();
//     const instance = await TokenChopStable.at(await factory.allStable(0));
//     const quote = await instance.quoteSymbol();
//     assert.equal(quote, 'BUSD');
//   });  


//   it("can mint a stable token once transfer funds approved", async () => {
//     const factory = await TokenChopFactory.deployed();
//     const stableAddr = await factory.allStable(0);
//     const instance = await TokenChopStable.at(stableAddr);
//     const bandInstance = await MockBandProtocol.deployed();
//     await bandInstance.setPrice(math.fromEth('199'));
//     const bnbInstance = await IBEP20.at(BNB);
//     const amount = math.fromEth('0.2');
//     let bnbBalance = await bnbInstance.balanceOf(accounts[0]);
//     let collateral = await instance.collateral();
//     let balance = await instance.balanceOf(accounts[0]);
//     //log('BNBBalanceStart:', bnbBalance);
//     //log('CollateralStart:', collateral);
//     //log('BalanceStart:', balance);
//     await bnbInstance.approve(stableAddr, amount);
//     await instance.mintAtBaseAmount(amount);
//     let afterMintBnbBalance = await bnbInstance.balanceOf(accounts[0]);
//     let afterMintCollateral = await instance.collateral();    
//     let afterMintBalance = await instance.balanceOf(accounts[0]);
//     let afterMintPrice = await instance.price();
//     let quote = math.baseToQuote(afterMintPrice, amount);
//     //log('BNBBalanceAfterMint:', afterMintBnbBalance);    
//     //log('CollateralAfterMint:', afterMintCollateral);      
//     //log('BalanceAfterMint:', afterMintBalance);    
//     //log('PriceAfterMint:', afterMintPrice);
//     assertNearly(afterMintBnbBalance, bnbBalance.sub(amount));
//     assertNearly(afterMintCollateral, collateral.add(amount));
//     assertNearly(afterMintBalance, balance.add(quote));
//     const result = await instance.burn(quote);
//     //printLogs(result);
//     let afterWithdrawBnbBalance = await bnbInstance.balanceOf(accounts[0]);
//     let afterWithdrawCollateral = await instance.collateral();
//     let afterWithdrawBalance = await instance.balanceOf(accounts[0]);
//     //log('BNBBalanceAfterWithdraw:', afterWithdrawBnbBalance);    
//     //log('CollateralAfterWithdraw:', afterWithdrawCollateral);    
//     //log('BalanceAfterWithdraw:', afterWithdrawBalance);    
//     assertNearly(afterWithdrawBnbBalance, afterMintBnbBalance.add(amount));
//     assertNearly(afterWithdrawCollateral, afterMintCollateral.sub(amount));
//     assertNearly(afterWithdrawBalance, afterMintBalance.sub(quote));
//   });

// });
