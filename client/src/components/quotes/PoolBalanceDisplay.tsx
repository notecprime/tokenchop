import { utils } from 'ethers';
import React from 'react';
import { SinglePoolProperties } from '../../slices/poolsSlice';
import { roundTo4 } from '../../utils';

export const PoolBalanceDisplay = (props: SinglePoolProperties) => {
    const { totalSupply, balanceOf, collateral, price } = props;
    const balanceOfBN = utils.parseEther(balanceOf);
    const totalSupplyBN = utils.parseEther(totalSupply);
    const collateralBN = utils.parseEther(collateral);
    const priceBN = utils.parseEther(price);
    const scaleBN = utils.parseEther('1');
    let quote = utils.formatEther(utils.parseEther('0'));
    if (!totalSupplyBN.isZero()) {
        quote = utils.formatEther(collateralBN.mul(priceBN).div(scaleBN).mul(balanceOfBN).div(totalSupplyBN));
    }
    return <div className="selectable">{roundTo4(quote)}</div>
}