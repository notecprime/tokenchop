import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

export * from './getContract';
export * from './getLibrary';

export const getSigner: (library: Web3Provider, account: string) => JsonRpcSigner =
    (library, account) => library.getSigner(account).connectUnchecked();
  
export const getProviderOrSigner: (library: Web3Provider, account?: string) => Web3Provider | JsonRpcSigner =
    (library, account) => account ? getSigner(library, account) : library
