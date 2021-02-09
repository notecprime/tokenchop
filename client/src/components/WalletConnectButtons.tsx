import { Web3Provider } from '@ethersproject/providers';
import { Button, ButtonGroup, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { connectAsync, connectBscAsync } from '../slices/walletSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    }
  }),
);

export const WalletConnectButtons = () => {
  const classes = useStyles();    
    const { activate } = useWeb3React<Web3Provider>()
    const dispatch = useDispatch();    
    return (
      <ButtonGroup variant="outlined" color="inherit">
        <Button onClick={() => dispatch(connectAsync(activate))}>Metamask</Button>
        <Button  onClick={() => dispatch(connectBscAsync(activate))}>Binance Chain Wallet</Button>
      </ButtonGroup>               
    )
  }