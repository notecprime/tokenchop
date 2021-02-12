import { utils } from 'ethers';
import React from 'react';

export interface BalanceDisplayProps {
    decimals?: number,
    value?: string
}

const roundTo4 = (value: string) => {
    let [left, right] = value.split('.');
    right = !right ? '0000' : right + '0000';
    return `${left}.${right.slice(0,4)}`;
}

export const BalanceDisplay = (props: BalanceDisplayProps) => {
    const { decimals = '18', value = '0' } = props;
    //const displayValue = utils.formatUnits(value, decimals);
    return <div className="selectable">{roundTo4(value)}</div>
    //return <div>balance</div>
}