import { utils } from 'ethers';
import React from 'react';

export interface PriceDisplayProps {
    decimals?: number,
    value?: string,
    loading?: boolean
}

export const PriceDisplay = (props: PriceDisplayProps) => {
    const { decimals = '18', value = '0' } = props;
    //const displayValue = utils.formatUnits(value, decimals);
    return <div className="selectable">{value}</div>
    //return <div>price</div>
}