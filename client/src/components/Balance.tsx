import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useAsync } from 'react-use';
import { CurrencyDisplay } from './CurrencyDisplay';

export const Balance = (props: any) => {
    const { account, chainId } = props;
    const { library } = useWeb3React<Web3Provider>()
    const { value: balance } = useAsync(async () => {
        const result = await library?.getBalance(account || '');
        return result;
    }, [account, chainId]);
    if(!balance) {
        return <div>...</div>
    }
    return <div>Balance: <CurrencyDisplay value={balance.toString()}></CurrencyDisplay></div>
}