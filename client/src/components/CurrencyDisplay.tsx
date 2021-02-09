import { utils } from 'ethers';
import React from 'react';

export interface CurrentDisplayProps {
    decimals?: number,
    value?: string
}

export const CurrencyDisplay = (props: CurrentDisplayProps) => {
    const { decimals = '18', value = '0' } = props;
    const displayValue = utils.formatUnits(value, decimals);
    return <div>{displayValue}</div>
}