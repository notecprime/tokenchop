import { ChainId } from './chainId';
export * from './chainId';

export type AddressByChain = Record<number, string>;
export const NetworkContextName = 'NETWORK';
export const TOKEN_ADDRESS: Record<string, AddressByChain> = {
    "BNB": {
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
export const TOKENCHOP_PAIR_ADDRESS: AddressByChain = {
    [ChainId.BSC_TEST]: '0xeFFEa4030f19C9588c7cE864ae5553745717766B',
    [ChainId.LOCAL]: '0xeFFEa4030f19C9588c7cE864ae5553745717766B'
}

export const TOKENCHOP_FACTORY_ADDRESS: AddressByChain = {
    [ChainId.BSC_TEST]: '0x721241fe78f48f386E6Fb29a2535572Fc690199e',
    [ChainId.LOCAL]: '0x57eFF48719A5970f386f427d9323f8ed136B43b4'
}

export const BAND_PROTOCOL_ADDRESS: AddressByChain = {
    [ChainId.BSC_TEST]: '0xDA7a001b254CD22e46d3eAB04d937489c93174C3',
    [ChainId.LOCAL]: '0xDA7a001b254CD22e46d3eAB04d937489c93174C3'
}

export type ChainLinkSymbols = 'BNB' | 'BTC' | 'ETH';

export const CHAINLINK_BNBUSD_PROTOCOL_ADDRESS: AddressByChain = {
    [ChainId.LOCAL]: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE'
}

export const CHAINLINK_BTCUSD_PROTOCOL_ADDRESS: AddressByChain = {
    [ChainId.LOCAL]: '0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf'
}

export const CHAINLINK_ETHUSD_PROTOCOL_ADDRESS: AddressByChain = {
    [ChainId.LOCAL]: '0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e'
}

export const WBNB_TOKEN_ADDRESS: AddressByChain = {
    [ChainId.LOCAL]: '0xae13d989dac2f0debff460ac112a837c89baa7cd'
}

//export const SUPPORTED_CHAIN_IDS = [1, 3, 4, 5, 42, 56, 97, 1337];
export const SUPPORTED_CHAIN_IDS = [97, 1337];