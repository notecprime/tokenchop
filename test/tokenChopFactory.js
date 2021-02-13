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

  const testCase = data => {

  }


  it("Runs 10 test cases", async () => {
    const SCALE_FACTOR = web3.utils.toBN(10000)
    const bnbInstance = await IBEP20.at(BNB);
    const bandInstance = await MockBandProtocol.deployed();
    const factory = await TokenChopFactory.deployed();
    const stableAddr = await factory.allStable(0);
    const stable = await TokenChopStable.at(stableAddr);
    const specAddr = await factory.allSpec(0);
    const spec = await TokenChopSpec.at(specAddr);
    const mintStable = async amountStr => {
      const amountBn = web3.utils.toBN(amountStr).div(SCALE_FACTOR);      
      await bnbInstance.approve(stableAddr, amountBn);
      await stable.mintAtBaseAmount(amountBn);  
    };
    const mintSpec = async amountStr => {
      const amountBn = web3.utils.toBN(amountStr).div(SCALE_FACTOR);      
      await bnbInstance.approve(specAddr, amountBn);
      await spec.mintAtBaseAmount(amountBn);
    };
    const burn = async (contract, amountStr) => {
      const priceBn = await contract.price();
      const amountBn = web3.utils.toBN(amountStr).div(SCALE_FACTOR);
      const quote = math.baseToQuote(priceBn, amountBn);
      await contract.burn(quote);
    };

    const setPrice = async price => {
      await bandInstance.setPrice(math.fromEth(price));
    }
    const checkStableAssertions = async expected => {
      const supplyBn = web3.utils.toBN(expected.supply_stable).div(SCALE_FACTOR);
      const collateralBn = web3.utils.toBN(expected.collateral_stable).div(SCALE_FACTOR);
      assert.equal(supplyBn, await stable.totalSupply())
      assert.equal(collateralBn, await stable.collateral())
    }
    const checkSpecAssertions = async expected => {
      const supplyBn = web3.utils.toBN(expected.supply_spec).div(SCALE_FACTOR);
      const collateralBn = web3.utils.toBN(expected.collateral_spec).div(SCALE_FACTOR);
      assert.equal(supplyBn, await spec.totalSupply())
      assert.equal(collateralBn, await spec.collateral())
    }
    testcases.slice(0, 10).forEach(
      async testcase => {
        const { price, pool, action, amount } = testcase;
        await setPrice(price);
        // if (pool === 1) {
        //   action === 1 ? await mintStable(amount) : await burn(stable, amount);
        //   const { supply_stable, collateral_stable } = testcase;
        //   await checkStableAssertions({ supply_stable, collateral_stable });
        // } else {
        //   action === 1 ? await mintSpec(amount) : await burn(spec, amount);
        //   const { supply_spec, collateral_spec } = testcase;
        //   await checkSpecAssertions({ supply_spec, collateral_spec });          
        // }
      }
    )
  });  



});
