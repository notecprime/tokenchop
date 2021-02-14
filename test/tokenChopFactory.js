const TokenChopFactory = artifacts.require("TokenChopFactory");
const TokenChopStableFactory = artifacts.require("TokenChopStableFactory");
const TokenChopStable = artifacts.require("TokenChopStable");
const TokenChopSpec = artifacts.require("TokenChopSpec");
const MockBandProtocol = artifacts.require("MockBandProtocol");
const IBEP20 = artifacts.require("IBEP20");
const IStdReference = artifacts.require("IStdReference");
const math = require('./helpers/math');
const testcases = require('./data/testcases.json')
const testlowcollateral = require('./data/testlowcollateral.json')
const realBandProtocolAddr = '0xDA7a001b254CD22e46d3eAB04d937489c93174C3';

const BUSD = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee';
const ETH = '0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378';
const WBNB = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
const BTC = '0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8';
const XRP = '0xa83575490D7df4E2F47b7D38ef351a2722cA45b9';
const DAI = '0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867';

const SCALE_FACTOR = web3.utils.toBN(10000)
let bnbInstance;
let bandInstance;
let stableAddr;
let stable;
let specAddr;
let spec;

const amountToBN = amount => {
  const scaled = (amount*10000).toString();
  const [noDecimalsScaled] = scaled.split('.');
  return web3.utils.toBN(math.fromEth(noDecimalsScaled)).div(SCALE_FACTOR);
}

const mintStable = async amount => {
  const amountBn = amountToBN(amount).div(SCALE_FACTOR);
  await bnbInstance.approve(stableAddr, amountBn);
  await stable.mintAtBaseAmount(amountBn);  
};
const mintSpec = async amount => {
  const amountBn = amountToBN(amount).div(SCALE_FACTOR);
  await bnbInstance.approve(specAddr, amountBn);
  await spec.mintAtBaseAmount(amountBn);
};
const burnStable = async (amount, price) => {
  const priceBn = math.fromEth(price);
  const amountBn = amountToBN(amount).div(SCALE_FACTOR);      
  const quote = math.baseToQuote(priceBn, amountBn);
  await stable.burn(quote);
};
const burnSpec = async (amount, supplyPrice) => {
  const priceBn = supplyPrice;
  const amountBn = amountToBN(amount).div(SCALE_FACTOR);      
  const supply = math.baseToQuote(priceBn, amountBn);
  await spec.burn(supply);
};
const setPrice = async price => {
  await bandInstance.setPrice(math.fromEth(price));
}

const roundTo4 = value => {
  return value.div(web3.utils.toBN(10**9))
       .add(web3.utils.toBN(5))
       .div(web3.utils.toBN(10))
       .mul(web3.utils.toBN(10**10))
}

const assertNearly = (expected, actual) => {
  const diff = expected.gt(actual) ? expected.sub(actual) : actual.sub(expected);
  assert.isTrue(diff.lte(web3.utils.toBN(10**14)));
}

const checkAssertions = async expected => {
  const supplyStableBn = amountToBN(expected.supply_stable).div(SCALE_FACTOR);
  const collateralStableBn = amountToBN(expected.collateral_stable).div(SCALE_FACTOR);
  const supplySpecBn = amountToBN(expected.supply_spec).div(SCALE_FACTOR);
  const collateralSpecBn = amountToBN(expected.collateral_spec).div(SCALE_FACTOR);
  const supply_stable = roundTo4(await stable.totalSupply());
  const collateral_stable = roundTo4(await stable.collateral());
  const supply_spec = roundTo4(await spec.totalSupply());
  const collateral_spec = roundTo4(await spec.collateral());
  //console.log(`supply_stable: ${math.toEth(supply_stable.mul(SCALE_FACTOR))}`);
  //console.log(`collateral_stable: ${math.toEth(collateral_stable.mul(SCALE_FACTOR))}`);
  //console.log(`supply_spec: ${math.toEth(supply_spec.mul(SCALE_FACTOR))}`);
  //console.log(`collateral_spec: ${math.toEth(collateral_spec.mul(SCALE_FACTOR))}`);
  assertNearly(supplyStableBn, supply_stable);
  assertNearly(collateralStableBn, collateral_stable);
  assertNearly(supplySpecBn, supply_spec);
  assertNearly(collateralSpecBn, collateral_spec);
}  

contract("TokenChopFactory", accounts => {

  it("poolFactorySetter should be account[0]", async () => {
    const instance = await TokenChopFactory.deployed();
    assert.equal(await instance.poolFactorySetter(), accounts[0], "Should be account[0]");
  });

  it("createPair should create a pair ETH/BUSD", async () => {   
    const instance = await TokenChopFactory.deployed();
    const stableFactory = await TokenChopStableFactory.deployed();;
    if (await stableFactory.bandAddr() == realBandProtocolAddr) {
      console.log('Skipping test as pair already deployed');
      return;
    }
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

  it("Runs 90 test cases", async () => {
    const factory = await TokenChopFactory.deployed();
    stableAddr = await factory.allStable(0);
    stable = await TokenChopStable.at(stableAddr);
    specAddr = await factory.allSpec(0);
    spec = await TokenChopSpec.at(specAddr);
    stable = await TokenChopStable.at(stableAddr);
    if (await stable.bandProtocol() == realBandProtocolAddr) {
      console.log('Skipping MockBandProtocol tests');
      return;
    }
    bnbInstance = await IBEP20.at(WBNB);
    bandInstance = await MockBandProtocol.deployed();

    for (let i=0;i<testcases.length;i++) {
      let testcase = testcases[i];
      const { price, pool, action, amount } = testcase;
      console.log(`Transaction ${i+1} of ${testcases.length}`);
      //console.log(testcase);
      await setPrice(price);
      const amountBn = amountToBN(amount).div(SCALE_FACTOR);
      await bnbInstance.approve(stableAddr, amountBn);
      if (pool === 1) {
        action === 1 ? await mintStable(amount) : await burnStable(amount, price);
      } else {
        if (action === 1) {
          await mintSpec(amount);
        } else {
          await stable.refresh();
          const supplyPrice = await spec.price();
          await burnSpec(amount, supplyPrice);
        }
      }
      await checkAssertions(testcase);      
    }
  });  

});

contract("TokenChopFactoryLowCollateral", accounts => {

  it("Runs low collateral test cases", async () => {
    bnbInstance = await IBEP20.at(WBNB);
    bandInstance = await MockBandProtocol.deployed();
    const factory = await TokenChopFactory.deployed();
    stableAddr = await factory.allStable(0);
    stable = await TokenChopStable.at(stableAddr);
    specAddr = await factory.allSpec(0);
    spec = await TokenChopSpec.at(specAddr);
    if (await stable.bandProtocol() == realBandProtocolAddr) {
      console.log('Skipping MockBandProtocol tests');
      return;
    }

    for (let i=0;i<6;i++) {
      let testcase = testlowcollateral[i];
      const { price, pool, action, amount } = testcase;
      console.log(`Low Collateral ${i+1} of ${testlowcollateral.length}`);
      //console.log(testcase);
      await setPrice(price);
      const amountBn = amountToBN(amount).div(SCALE_FACTOR);
      await bnbInstance.approve(stableAddr, amountBn);
      if (pool === 1) {
        action === 1 ? await mintStable(amount) : await burnStable(amount, price);
      } else {
        if (action === 1) {
          await mintSpec(amount);
        } else {
          await stable.refresh();
          const supplyPrice = await spec.price();
          await burnSpec(amount, supplyPrice);
        }
      }
      await checkAssertions(testcase);      
    }
  });  
  
});

contract("TokenChopFactoryRealBandProtocol", accounts => {

  it("Check it works with the pairs", async () => {
    const stableFactory = await TokenChopStableFactory.deployed();
    const factory = await TokenChopFactory.deployed();
    const bandAddr = await stableFactory.bandAddr();
    if (bandAddr != realBandProtocolAddr) {
      console.log('Skipping RealBandProtocol tests');
      return;
    }

    const stableLength = await factory.allPairsLength();
    bandInstance = await IStdReference.at(bandAddr);
    const items = [];
    for (let i=0; i<stableLength; i++) {
      const addr = await factory.allStable(i);
      const instance = await TokenChopStable.at(addr);
      const baseAddr = await instance.base(); 
      const baseSymbol = await instance.baseSymbol();
      const quoteSymbol = await instance.quoteSymbol();
      const baseToUse = await instance.symbolLookup(baseSymbol);
      const quoteToUse = await instance.symbolLookup(quoteSymbol);
      const details = {
        instance,
        addr,
        baseAddr, 
        baseInstance: await IBEP20.at(await instance.base()),
        baseSymbol,
        quoteSymbol,
        baseToUse,
        quoteToUse
      }
      items.push(details);
    }
    let baseContract;
    let stableContract;
    let stableAddr;
    let collateral;
    let supply;
    let price;
    let refPrice;
    const amountBn = amountToBN(7).div(SCALE_FACTOR);

    baseContract = items[0].baseInstance;
    stableContract = items[0].instance;
    stableAddr = items[0].addr;
    await baseContract.approve(stableAddr, amountBn);
    await stableContract.mintAtBaseAmount(amountBn);
    collateral = await baseContract.balanceOf(stableAddr);
    supply = await stableContract.balanceOf(accounts[0]);
    price = await stableContract.price();
    refPrice = (await bandInstance.getReferenceData(items[0].baseToUse,items[0].quoteToUse)).rate;
    // console.log(math.toEth(collateral));
    // console.log(math.toEth(supply));
    // console.log(math.toEth(price));
    // console.log(math.toEth(refPrice));
    assert.isTrue(collateral.eq(amountBn), 'bad collateral');
    assert.isTrue(supply.eq(amountBn.mul(price).div(web3.utils.toBN(10**18))), 'bad supply');
    assert.isTrue(price.eq(web3.utils.toBN(refPrice)), 'bad ref price');

    baseContract = items[1].baseInstance;
    stableContract = items[1].instance;
    stableAddr = items[1].addr;
    await baseContract.approve(stableAddr, amountBn);
    await stableContract.mintAtBaseAmount(amountBn);
    collateral = await baseContract.balanceOf(stableAddr);
    supply = await stableContract.balanceOf(accounts[0]);
    price = await stableContract.price();
    refPrice = (await bandInstance.getReferenceData(items[1].baseToUse,items[1].quoteToUse)).rate;
    // console.log(math.toEth(collateral));
    // console.log(math.toEth(supply));
    // console.log(math.toEth(price));
    // console.log(math.toEth(refPrice));
    assert.isTrue(collateral.eq(amountBn));
    assert.isTrue(supply.eq(amountBn.mul(price).div(web3.utils.toBN(10**18))), 'bad supply');    
    assert.isTrue(price.eq(web3.utils.toBN(refPrice)));

    baseContract = items[2].baseInstance;
    stableContract = items[2].instance;
    stableAddr = items[2].addr;
    await baseContract.approve(stableAddr, amountBn);
    await stableContract.mintAtBaseAmount(amountBn);
    collateral = await baseContract.balanceOf(stableAddr);
    supply = await stableContract.balanceOf(accounts[0]);
    price = await stableContract.price();
    refPrice = (await bandInstance.getReferenceData(items[2].baseToUse,items[2].quoteToUse)).rate;
    // console.log(math.toEth(collateral));
    // console.log(math.toEth(supply));
    // console.log(math.toEth(price));
    // console.log(math.toEth(refPrice));
    assert.isTrue(collateral.eq(amountBn));
    assert.isTrue(supply.eq(amountBn.mul(price).div(web3.utils.toBN(10**18))), 'bad supply');    
    assert.isTrue(price.eq(web3.utils.toBN(refPrice)));

    baseContract = items[3].baseInstance;
    stableContract = items[3].instance;
    stableAddr = items[3].addr;
    await baseContract.approve(stableAddr, amountBn);
    await stableContract.mintAtBaseAmount(amountBn);
    collateral = await baseContract.balanceOf(stableAddr);
    supply = await stableContract.balanceOf(accounts[0]);
    price = await stableContract.price();
    refPrice = (await bandInstance.getReferenceData(items[3].baseToUse,items[3].quoteToUse)).rate;
    // console.log(math.toEth(collateral));
    // console.log(math.toEth(supply));
    // console.log(math.toEth(price));
    // console.log(math.toEth(refPrice));
    assert.isTrue(collateral.eq(amountBn));
    assert.isTrue(supply.eq(amountBn.mul(price).div(web3.utils.toBN(10**18))), 'bad supply');    
    assert.isTrue(price.eq(web3.utils.toBN(refPrice)));

    baseContract = items[4].baseInstance;
    stableContract = items[4].instance;
    stableAddr = items[4].addr;
    await baseContract.approve(stableAddr, amountBn);
    await stableContract.mintAtBaseAmount(amountBn);
    collateral = await baseContract.balanceOf(stableAddr);
    supply = await stableContract.balanceOf(accounts[0]);
    price = await stableContract.price();
    refPrice = (await bandInstance.getReferenceData(items[4].baseToUse,items[4].quoteToUse)).rate;
    // console.log(math.toEth(collateral));
    // console.log(math.toEth(supply));
    // console.log(math.toEth(price));
    // console.log(math.toEth(refPrice));
    assert.isTrue(collateral.eq(amountBn));
    assert.isTrue(supply.eq(amountBn.mul(price).div(web3.utils.toBN(10**18))), 'bad supply');    
    assert.isTrue(price.eq(web3.utils.toBN(refPrice)));
  });  
  
});