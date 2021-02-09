import { Web3Provider } from '@ethersproject/providers';
import { Button, ButtonGroup, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { disconnectAsync } from '../slices/walletSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline'
    },
    account: {
      paddingRight: '16px'
    }
  }),
);

export const WalletConnectedInfo = () => {
  const classes = useStyles();    
  const { connector, account } = useWeb3React<Web3Provider>()  
  const dispatch = useDispatch();      
  return (
    <div className={classes.root}>
      <div className={classes.account}>Account: {account}</div>
      <ButtonGroup variant="outlined" color="inherit">
        <Button onClick={() => dispatch(disconnectAsync(connector))}>Disconnect</Button>  
      </ButtonGroup>      
    </div>
  )
}