import { utils } from 'ethers';
import React from 'react';

export interface BalanceDisplayProps {
    decimals?: number,
    value?: string
}

export const BalanceDisplay = (props: BalanceDisplayProps) => {
    const { decimals = '18', value = '0' } = props;
    //const displayValue = utils.formatUnits(value, decimals);
    return <div className="selectable">{value}</div>
    //return <div>balance</div>
}