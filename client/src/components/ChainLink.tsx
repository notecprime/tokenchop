import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChainLinkSymbols } from '../constants';
import { useChainLinkContract } from '../hooks/useChainLinkContract';
import { getDetailsAsync, selectChainLink } from '../slices/chainLinkSlice';
import { selectWallet } from '../slices/walletSlice';
import { CurrencyDisplay } from './CurrencyDisplay';

export interface ChainLinkProps {
    symbol: ChainLinkSymbols;
}

export const ChainLink = (props: ChainLinkProps) => {
    const { symbol } = props;
    const selector = selectChainLink(symbol);
    const { price } = useSelector(selector);
    const { connected } = useSelector(selectWallet);
    const dispatch = useDispatch();
    const contract = useChainLinkContract(symbol);
    return connected && contract ? (
        <div>
            <CurrencyDisplay value={price} decimals={8}></CurrencyDisplay>
            <button type="button" onClick={() => dispatch(getDetailsAsync(contract, symbol))}>Get Details</button>
        </div>
    ) : null
}