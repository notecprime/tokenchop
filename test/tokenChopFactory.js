const TokenChopFactory = artifacts.require("TokenChopFactory");
const TokenChopStable = artifacts.require("TokenChopStable");
const TokenChopSpec = artifacts.require("TokenChopSpec");
const MockBandProtocol = artifacts.require("MockBandProtocol");
const IBEP20 = artifacts.require("IBEP20");
const math = require('./helpers/math');
const testcases = require('./data/testcases.json')

const BNB = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
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

  it("Runs 10 test cases", async () => {
    const SCALE_FACTOR = web3.utils.toBN(10000)
    const bnbInstance = await IBEP20.at(BNB);
    const bandInstance = await MockBandProtocol.deployed();
    const factory = await TokenChopFactory.deployed();
    const stableAddr = await factory.allStable(0);
    const stable = await TokenChopStable.at(stableAddr);
    const specAddr = await factory.allSpec(0);
    const spec = await TokenChopSpec.at(specAddr);

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
    const burn = async (contract, amount) => {
      console.log(`Burn ${amount}`)
      const priceBn = await contract.price();
      const amountBn = amountToBN(amount).div(SCALE_FACTOR);      
      const quote = math.baseToQuote(priceBn, amountBn);
      await contract.burn(quote);
    };

    const setPrice = async price => {
      await bandInstance.setPrice(math.fromEth(price));
    }

    const checkAssertions = async expected => {
      const supplyStableBn = amountToBN(expected.supply_stable).div(SCALE_FACTOR);
      const collateralStableBn = amountToBN(expected.collateral_stable).div(SCALE_FACTOR);
      const supplySpecBn = amountToBN(expected.supply_spec).div(SCALE_FACTOR);
      const collateralSpecBn = amountToBN(expected.collateral_spec).div(SCALE_FACTOR);
      const supply_stable = await stable.totalSupply();
      const collateral_stable = await stable.collateral();
      const supply_spec = await spec.totalSupply();
      const collateral_spec = await spec.collateral();
      console.log(`supply_stable: ${math.toEth(supply_stable.mul(SCALE_FACTOR))}`);
      console.log(`collateral_stable: ${math.toEth(collateral_stable.mul(SCALE_FACTOR))}`);
      console.log(`supply_spec: ${math.toEth(supply_spec.mul(SCALE_FACTOR))}`);
      console.log(`collateral_spec: ${math.toEth(collateral_spec.mul(SCALE_FACTOR))}`);
      assert.isTrue(supplyStableBn.eq(supply_stable));
      assert.isTrue(collateralStableBn.eq(collateral_stable));
      assert.isTrue(supplySpecBn.eq(supply_spec));
      assert.isTrue(collateralSpecBn.eq(collateral_spec));
    }  

    for (let i=0;i<2;i++) {
      let testcase = testcases[i];
      const { price, pool, action, amount } = testcase;
      console.log(testcase);
      await setPrice(price);
      const amountBn = amountToBN(amount).div(SCALE_FACTOR);
      await bnbInstance.approve(stableAddr, amountBn);
      if (pool === 1) {
        action === 1 ? await mintStable(amount) : await burn(stable, amount);
      } else {
        action === 1 ? await mintSpec(amount) : await burn(spec, amount);
      }
      await checkAssertions(testcase);      
    }
});  



});
