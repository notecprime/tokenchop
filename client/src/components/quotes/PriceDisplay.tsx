import { utils } from 'ethers';
import React from 'react';

export interface PriceDisplayProps {
    decimals?: number,
    value?: string,
    loading?: boolean
}

const roundTo4 = (value: string) => {
    let [left, right] = value.split('.');
    right = !right ? '0000' : right + '0000';
    return `${left}.${right.slice(0,4)}`;
}

export const PriceDisplay = (props: PriceDisplayProps) => {
    const { decimals = '18', value = '0' } = props;
    //const displayValue = utils.formatUnits(value, decimals);
    return <div className="selectable">{roundTo4(value)}</div>
    //return <div>price</div>
}