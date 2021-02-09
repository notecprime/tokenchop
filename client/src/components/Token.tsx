import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useERC20Contract } from '../hooks/useERC20Contract';
import { getBalanceOfAsync, getDetailsAsync, mintAsync, selectToken } from '../slices/tokenSlice';
import { selectWallet, ValidToken } from '../slices/walletSlice';
import { CurrencyDisplay } from './CurrencyDisplay';

export interface TokenProps {
    name: ValidToken
}

export const Token = (props: TokenProps) => {
    const { name } = props;
    const selector = selectToken(name);
    const { symbol, decimals, balanceOf, totalSupply } = useSelector(selector);
    const { connected } = useSelector(selectWallet);
    const dispatch = useDispatch();
    const contract = useERC20Contract(name);
    const account = '0xC9e57491D8Cdd06cB4696A563158840b9554106b';
    return connected && contract ? (
        <div>
            <div>{name}</div>
            <div>{symbol}</div>
            <div>{decimals}</div>
            <CurrencyDisplay value={totalSupply}></CurrencyDisplay>
            <CurrencyDisplay value={balanceOf}></CurrencyDisplay>
            <button type="button" onClick={() => dispatch(getDetailsAsync(contract))}>Get Details</button>
            <button type="button" onClick={() => dispatch(getBalanceOfAsync(contract, account, name))}>Get Balance</button>
            <button type="button" onClick={() => dispatch(mintAsync(contract, account, name))}>Mint</button>
        </div>
    ) : null
}