import { utils } from 'ethers';
import React from 'react';
import { SinglePoolProperties } from '../../slices/poolsSlice';

const roundTo4 = (value: string) => {
    let [left, right] = value.split('.');
    right = !right ? '0000' : right + '0000';
    return `${left}.${right.slice(0,4)}`;
}

export const TotalPoolDisplay = (props: SinglePoolProperties & { price: string }) => {
    const { totalSupply, collateral, price } = props;
    //const displayValue = utils.formatUnits(value, decimals);
    return <div className="selectable">{roundTo4(collateral)}</div>
    //return <div>balance</div>
}