import { makeStyles } from '@material-ui/core';
import { BigNumber, utils } from 'ethers';
import React from 'react';
import { SinglePoolProperties } from '../../slices/poolsSlice';
import { ValidToken } from '../../slices/walletSlice';
import { roundTo4 } from '../../utils';

const useStyles = makeStyles({
    price: {
        whiteSpace: 'nowrap'
    }
});
  
export const TotalPoolDisplay = (props: SinglePoolProperties & { base: ValidToken }) => {
    const classes = useStyles();    
    const { totalSupply, collateral, price, base } = props;
    const collateralBN = utils.parseEther(collateral);
    const priceBN = utils.parseEther(price);
    const scaleBN = utils.parseEther('1');
    const quote = utils.formatEther(collateralBN.mul(priceBN).div(scaleBN));

    const baseDisplay = `${roundTo4(collateral)} ${base}`;
    return <div className="selectable">
        <div className={classes.price}>{`${roundTo4(quote)} BUSD`}</div>
        <div className={classes.price}>{`${baseDisplay}`}</div>
    </div>
}