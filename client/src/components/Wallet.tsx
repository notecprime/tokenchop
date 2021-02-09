import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAppContext } from '../slices/appContextSlice';
import { selectWallet } from '../slices/walletSlice';
import { WalletConnectButtons } from './WalletConnectButtons';
import { WalletConnectedInfo } from './WalletConnectedInfo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    }
  }),
);

export const Wallet = () => {
  const classes = useStyles();  
  const { stepperStage } = useSelector(selectAppContext);  
  const { connected } = useSelector(selectWallet);
  if (stepperStage == -1) return null;
  return connected ?
    <WalletConnectedInfo></WalletConnectedInfo>
    : <WalletConnectButtons></WalletConnectButtons>               
}