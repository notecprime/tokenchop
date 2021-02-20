Tokenchop is a DeFi solution that splits any BEP20 token (e.g. WBNB) into two new BEP20 tokens with different risk-return profiles based on a pair (e.g. WBNB/BUSD). 

[Tokenchop Overview video](https://youtu.be/PH--VbwsMzU)

# Build and Deployment

### Requirements
ganache-cli@6.12.2

truffle@5.1.63

## Front end
To run at localhost:3000
```
npm run build
cd client
npm start
```

To build (outputs to client/build)
```
npm run build
cd client
npm run build
```

# Backend

- clone repo
```
npm install
```
 - create .secret file with mnemonic phrase
```
npm run ganache
truffle test
truffle test --network staging
truffle migrate 
```

--network staging option runs tests against real BandProtocol vs mock

# Deployment to testnet
```
    truffle migrate --network testnet
```
The above deploys the factory contracts. The next commands connect the factories, once this is done createPair can be called to create the pools. 

All this should be run from

```
truffle console
```

TokenChopFactory Address = 0x721241fe78f48f386E6Fb29a2535572Fc690199e

TokenChopSpecFactory Address = 0xB32a43bc28cb95AA12C83320B330D47e5007cf60

TokenChopStableFactory Address = 0xFdb950ebeD62900624264C4Fb51eBEA61171914C

```
const f = await TokenChopFactory.at('0x721241fe78f48f386E6Fb29a2535572Fc690199e')
const r = await f.setPoolFactories('0xFdb950ebeD62900624264C4Fb51eBEA61171914C', '0xB32a43bc28cb95AA12C83320B330D47e5007cf60')
const stable = await TokenChopStableFactory.at('0xFdb950ebeD62900624264C4Fb51eBEA61171914C')
```

Now create the pools for the UI

```
const WBNB = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
const ETH = '0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378';
const BTC = '0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8';
const XRP = '0xa83575490D7df4E2F47b7D38ef351a2722cA45b9';
const DAI = '0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867';
const BUSD = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee';

// WBNB, BUSD
await f.createPair('0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee');
// ETH, BUSD
await f.createPair('0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378', '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee');
// BTC, BUSD  
await f.createPair('0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8', '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee');
// XRP, BUSD  
await f.createPair('0xa83575490D7df4E2F47b7D38ef351a2722cA45b9', '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee');
// DAI, BUSD  
await f.createPair('0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867', '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee');
```



# Contract Addresses
TokenChopFactory [0x721241fe78f48f386E6Fb29a2535572Fc690199e](https://testnet.bscscan.com/address/0x721241fe78f48f386E6Fb29a2535572Fc690199e)

TokenChopSpecFactory [0xB32a43bc28cb95AA12C83320B330D47e5007cf60](https://testnet.bscscan.com/address/0xB32a43bc28cb95AA12C83320B330D47e5007cf60)

TokenChopStableFactory [0xFdb950ebeD62900624264C4Fb51eBEA61171914C](https://testnet.bscscan.com/address/0xFdb950ebeD62900624264C4Fb51eBEA61171914C)

StablePool (WBNB/BUSD) [0x68bc4408Cc0Cd5C9A84c40f95553df50D54F5d2E](https://testnet.bscscan.com/address/0x68bc4408Cc0Cd5C9A84c40f95553df50D54F5d2E)

SpecPool (WBNB/BUSD) [0x4E02e6BF75c1894C805e59433C26D76CbB1E9950](https://testnet.bscscan.com/address/0x4E02e6BF75c1894C805e59433C26D76CbB1E9950)

StablePool (ETH/BUSD) [0xb9A5e888192713c9E4d6005Da9D441bbd431D442](https://testnet.bscscan.com/address/0xb9A5e888192713c9E4d6005Da9D441bbd431D442)

SpecPool (ETH/BUSD) [0x1b7CF1a8088Ab8738A4C38BebD3c34515f125bf9](https://testnet.bscscan.com/address/0x1b7CF1a8088Ab8738A4C38BebD3c34515f125bf9)

StablePool (BTC/BUSD) [0xDD6021CfB0dc12b287d42A44cB09361ABbf6234b](https://testnet.bscscan.com/address/0xDD6021CfB0dc12b287d42A44cB09361ABbf6234b)

SpecPool (BTC/BUSD) [0xf7FD68F477F31EE88e6e55191E95f8Da8e79F500](https://testnet.bscscan.com/address/0xf7FD68F477F31EE88e6e55191E95f8Da8e79F500)

StablePool (XRP/BUSD) [0xe1F603dDdC524c1ac6D9728D8AC580960a9FC25C](https://testnet.bscscan.com/address/0xe1F603dDdC524c1ac6D9728D8AC580960a9FC25C)

SpecPool (XRP/BUSD) [0x01096bb743CB1A86147ab8ef2b4b744ADc79639d](https://testnet.bscscan.com/address/0x01096bb743CB1A86147ab8ef2b4b744ADc79639d)

StablePool (DAI/BUSD) [0xAf5A68f6461eD3C19d8BaF789d08d41e219c99a1](https://testnet.bscscan.com/address/0xAf5A68f6461eD3C19d8BaF789d08d41e219c99a1)

SpecPool (DAI/BUSD) [0xe407E9A7EF6b875A40aB2eB59Ace72Dadc00eBC8](https://testnet.bscscan.com/address/0xe407E9A7EF6b875A40aB2eB59Ace72Dadc00eBC8)

## Token Contract Addresses
Get these tokens from the [Binance Smart Chain Faucet](https://testnet.binance.org/faucet-smart)

WBNB [0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd](https://testnet.bscscan.com/address/0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd)

ETH [0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378](https://testnet.bscscan.com/address/0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378)

BTC [0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8](https://testnet.bscscan.com/address/0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8)

XRP [0xa83575490D7df4E2F47b7D38ef351a2722cA45b9](https://testnet.bscscan.com/address/0xa83575490D7df4E2F47b7D38ef351a2722cA45b9)

DAI [0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867](https://testnet.bscscan.com/address/0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867)

# About
The two new tokens are fund pools, one Stable and the other Speculative. The Spec pool takes all the gains and losses for both pools. Users can deposit or withdraw their original tokens at any time by minting or burning the corresponding token. A token of the stable pool is effectively a synthetic stable coin with a fixed value relative to the quote (eg. BUSD). This value is protected by the Speculative pool funds. A token of the Speculative pool is a synthetic margin account with leverage as it gets all the gains and losses for the funds across the contracts.

Benefits of the Stable pool
- Ability to create stable token without the need for collateral in excess of the value created.
- No transaction costs beyond gas to lock in a tokens price
- Return provided from fees paid by the Speculative pool

Benefits of the Speculative pool
- Cost effective method to create leverage.
- No risk of loss beyond the value of tokens in the pool
- No collateral requirement beyond the value of the tokens in the pool

## Market mechanism
- The two pools create their own market as the supply of each pool will vary according to market demand. There should be pool size ratio (SR) which represents market equilibrium.

PSR = Total Stable Pool Value / Total Spec Pool Value

Stable pool
- Below PSR
The Stable pool is smaller than predicted by PSR.
The Stable pool risk is less than market as there are proportionally more Spec funds to protect the Stable pool
The Stable pool return is higher than market as the fees are split across less Stable pool
As both risk and return is better than market the pool should increase towards PSR
- Above R
The Stable pool is larger than predicted by PSR.
The Stable pool risk is greater than market as there are proportionally fewer Spec funds to protect the Stable pool
The Stable pool return is lower than market as the fees are split across more Stable pool
As both risk and return are worse than market the pool should decrease towards PSR

Spec pool
- Below R
The Spec pool is larger than predicted by PSR.
The Spec pool risk does not change as this is related to change in market price, not the size of the Stable Pool
The Spec pool return is lower than market as the Stable pool gains are split across more Spec pool funds
As risk is unchanged but return is worse than market the pool should decrease towards PSR
- Above R
The Spec pool is smaller than predicted by PSR.
The Spec pool risk does not change as this is related to change in market price, not the size of the Stable Pool
The Spec pool return is higher than market as the Stable pool gains are split across fewer Spec pool funds
As risk is unchanged but return is better than market the pool should increase towards PSR

## Market price
Market price is determined by onchain oracles
