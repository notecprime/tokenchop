import { ChainId } from './chainId';
export * from './chainId';

export type AddressByChain = Record<number, string>;
export const NetworkContextName = 'NETWORK';
export const TOKEN_ADDRESS: Record<string, AddressByChain> = {
    "WBNB": {
        [ChainId.BSC_TEST]: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',        
        [ChainId.LOCAL]: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd'
    },
    "ETH": {
        [ChainId.BSC_TEST]: '0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378',        
        [ChainId.LOCAL]: '0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378'
    },
    "BTC": {
        [ChainId.BSC_TEST]: '0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8',        
        [ChainId.LOCAL]: '0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8'
    },
    "XRP": {
        [ChainId.BSC_TEST]: '0xa83575490D7df4E2F47b7D38ef351a2722cA45b9',        
        [ChainId.LOCAL]: '0xa83575490D7df4E2F47b7D38ef351a2722cA45b9'
    },
    "DAI": {
        [ChainId.BSC_TEST]: '0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867',        
        [ChainId.LOCAL]: '0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867'
    },
    "BUSD": {
        [ChainId.BSC_TEST]: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',        
        [ChainId.LOCAL]: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee'
    }
}

export const SPEC_POOL_ADDRESS: Record<string, AddressByChain> = {
    "WBNB": {
        [ChainId.BSC_TEST]: '0x4E02e6BF75c1894C805e59433C26D76CbB1E9950',
        [ChainId.LOCAL]: '0x4E02e6BF75c1894C805e59433C26D76CbB1E9950'
    },
    "ETH": {
        [ChainId.BSC_TEST]: '0x1b7CF1a8088Ab8738A4C38BebD3c34515f125bf9',        
        [ChainId.LOCAL]: '0x1b7CF1a8088Ab8738A4C38BebD3c34515f125bf9'
    },
    "BTC": {
        [ChainId.BSC_TEST]: '0xf7FD68F477F31EE88e6e55191E95f8Da8e79F500',        
        [ChainId.LOCAL]: '0xf7FD68F477F31EE88e6e55191E95f8Da8e79F500'
    },
    "XRP": {
        [ChainId.BSC_TEST]: '0x01096bb743CB1A86147ab8ef2b4b744ADc79639d',        
        [ChainId.LOCAL]: '0x01096bb743CB1A86147ab8ef2b4b744ADc79639d'
    },
    "DAI": {
        [ChainId.BSC_TEST]: '0xe407E9A7EF6b875A40aB2eB59Ace72Dadc00eBC8',        
        [ChainId.LOCAL]: '0xe407E9A7EF6b875A40aB2eB59Ace72Dadc00eBC8'
    }
}

export const STABLE_POOL_ADDRESS: Record<string, AddressByChain> = {
    "WBNB": {
        [ChainId.BSC_TEST]: '0x68bc4408Cc0Cd5C9A84c40f95553df50D54F5d2E',        
        [ChainId.LOCAL]: '0x68bc4408Cc0Cd5C9A84c40f95553df50D54F5d2E'
    },
    "ETH": {
        [ChainId.BSC_TEST]: '0xb9A5e888192713c9E4d6005Da9D441bbd431D442',        
        [ChainId.LOCAL]: '0xb9A5e888192713c9E4d6005Da9D441bbd431D442'
    },
    "BTC": {
        [ChainId.BSC_TEST]: '0xDD6021CfB0dc12b287d42A44cB09361ABbf6234b',        
        [ChainId.LOCAL]: '0xDD6021CfB0dc12b287d42A44cB09361ABbf6234b'
    },
    "XRP": {
        [ChainId.BSC_TEST]: '0xe1F603dDdC524c1ac6D9728D8AC580960a9FC25C',        
        [ChainId.LOCAL]: '0xe1F603dDdC524c1ac6D9728D8AC580960a9FC25C'
    },
    "DAI": {
        [ChainId.BSC_TEST]: '0xAf5A68f6461eD3C19d8BaF789d08d41e219c99a1',        
        [ChainId.LOCAL]: '0xAf5A68f6461eD3C19d8BaF789d08d41e219c99a1'
    }
}

export const TOKENCHOP_FACTORY_ADDRESS: AddressByChain = {
    [ChainId.BSC_TEST]: '0x721241fe78f48f386E6Fb29a2535572Fc690199e',
    [ChainId.LOCAL]: '0x57eFF48719A5970f386f427d9323f8ed136B43b4'
}

export const BAND_PROTOCOL_ADDRESS: AddressByChain = {
    [ChainId.BSC_TEST]: '0xDA7a001b254CD22e46d3eAB04d937489c93174C3',
    [ChainId.LOCAL]: '0xDA7a001b254CD22e46d3eAB04d937489c93174C3'
}

//export const SUPPORTED_CHAIN_IDS = [1, 3, 4, 5, 42, 56, 97, 1337];
export const SUPPORTED_CHAIN_IDS = [97, 1337];