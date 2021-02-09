import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectWallet } from '../slices/walletSlice';
import OrderEntry from './OrderEntry';
import QuotesTable from './quotes/QuotesTable';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tradeWindow: {
      width: '100%',
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'row'
    },
    selectWindow: {
      margin: '16px 30px 100px 30px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: '0 0 390px',
      borderRadius: '4px'
    },
    mainWindow: {
      margin: '16px 30px 16px 30px',      
      display: 'flex',      
      flexDirection: 'column',
      flex: '0 0 390px',
      alignItems: 'flex-start',
    },
    confirmWindow: {
      margin: '16px',      
      paddingTop: '100px',
      flex: '0 0 450px'
    },   
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
        <OrderEntry></OrderEntry>
      </div>
      <div className={classes.confirmWindow}>
        
      </div>
  </div>

  );
}


/* <BandProtocol></BandProtocol>
{/* <div>✅ <Balance chainId={chainId} account={account}></Balance></div>
<button type="button" onClick={() => dispatch(approveAsync(wbnbContract))}>Approve</button>
<button type="button" onClick={() => dispatch(sendAsync(tokenChopContract))}>Send</button>
<button type="button" onClick={() => dispatch(revertAsync(tokenChopContract))}>Revert</button>
<ChainLink symbol="BNB"></ChainLink>
<ChainLink symbol="BTC"></ChainLink>
<ChainLink symbol="ETH"></ChainLink>
<Token name="First Token"></Token>
<Token name="Second Token"></Token> */
