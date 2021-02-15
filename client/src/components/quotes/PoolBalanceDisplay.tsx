import { utils } from 'ethers';
import React from 'react';
import { SinglePoolProperties } from '../../slices/poolsSlice';

const roundTo4 = (value: string) => {
    let [left, right] = value.split('.');
    right = !right ? '0000' : right + '0000';
    return `${left}.${right.slice(0,4)}`;
}

export const PoolBalanceDisplay = (props: SinglePoolProperties) => {
    const { balanceOf } = props;
    //const displayValue = utils.formatUnits(value, decimals);
    return <div className="selectable">{roundTo4(balanceOf)}</div>
    //return <div>balance</div>
}