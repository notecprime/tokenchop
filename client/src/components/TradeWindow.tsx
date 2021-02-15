import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectWallet } from '../slices/walletSlice';
import BuyOrderEntry from './BuyOrderEntry';
import QuotesTable from './quotes/QuotesTable';
import SellOrderEntry from './SellOrderEntry';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tradeWindow: {
      width: '100%',
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'column'
    },
    selectWindow: {
      margin: '30px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: '4px'
    },
    mainWindow: {
      margin: '0px 40px 0px 40px',      
      display: 'flex',      
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-around'
    }
  }),
);

export default function TradeWindow() {
  const classes = useStyles();
  const { connected } = useSelector(selectWallet);  
  return (
    <div className={classes.tradeWindow}>
      <div className={classes.selectWindow}>
        <QuotesTable></QuotesTable>
      </div>
      <div className={classes.mainWindow}>
        <BuyOrderEntry></BuyOrderEntry>
        <SellOrderEntry></SellOrderEntry>
      </div>
  </div>

  );
}
