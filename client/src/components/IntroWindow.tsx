import { Button, Card, CardContent, Link, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import React, { useState } from 'react';
import ContractInfo from './ContractInfo';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    miniheader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '8px 20px 8px 20px '
    },    
    message: {
      display: 'flex',
      flexDirection: 'column',
      padding: '8px 20px 8px 20px '
    },
    main: {
      margin: '20px',
      flex: '1 1 auto',
      display: 'flex',
      alignItems: 'stretch',
      '& > div': {
        flex: '1 1 auto'
      }
    },
    mainbox: {
      display: 'flex',
      flexDirection: 'row',
      flex: '1 1 auto'
    },
    contractGroup: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    cardContents: {
      display: 'flex',
      flexDirection: 'column'
    },
    contractLink: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      flex: '1 1 250px'
    },
    listitem: {
      display: 'flex'
    }
  })
);

export default function IntroWindow() {
  const classes = useStyles();
  const [showContracts, setShowContracts] = useState(false);
  return (   <>
    <div className={classes.miniheader}>
      <Typography>This site only works with Binance Smart Chain Testnet</Typography>
      <Typography>Connect to your wallet with the buttons above</Typography>
    </div>
    <div className={classes.mainbox}>
    <Paper elevation={3} className={classes.main}>
      <Card className={classes.message} variant="outlined">
        <Button color="primary" style={{ alignSelf: 'flex-end' }} onClick={() => setShowContracts(!showContracts)}>{ showContracts ? 'Back' : 'Contract Addresses'}</Button>        
      { !showContracts ? 
      <CardContent className={classes.cardContents}>
      <Typography variant="h5" style={{ paddingBottom: '12px'}}>What is TokenChop?</Typography>
      <Typography variant="body1" align="justify">
        Tokenchop is a DeFi solution that splits any BEP20 token (e.g. WBNB) into two new BEP20 tokens with different risk-return profiles based on a pair (e.g. WBNB/BUSD). 
        <br/>
      </Typography>
      <Typography variant="body1" style={{padding: '12px 0'}} align="justify">      
        The two new tokens are fund pools, one Stable and the other Speculative. The Spec pool takes all the gains and losses for both pools. Users can deposit or withdraw their original tokens at any time by minting or burning the corresponding token. A token of the stable pool is effectively a synthetic stable coin with a fixed value relative to the quote (eg. BUSD). This value is protected by the Speculative pool funds. A token of the Speculative pool is a synthetic margin account with leverage as it gets all the gains and losses for the funds across the contracts.
        <br/>        
      </Typography>
      <Typography variant="h5">Benefits of the Stable pool</Typography>
      <div style={{ padding: '12px 0'}}>
        <div className={classes.listitem}><CheckIcon color="primary" style={{ paddingRight: '8px'}}/>Ability to create stable token without the need for collateral in excess of the value created.</div>
        <div className={classes.listitem}><CheckIcon color="primary" style={{ paddingRight: '8px'}}/>No transaction costs beyond gas to lock in a tokens price</div>
        <div className={classes.listitem}><CheckIcon color="primary" style={{ paddingRight: '8px'}}/>Return provided from fees paid by the Speculative pool ( fee mechanism still to be implemented)</div>
      </div>
      <Typography variant="h5">Benefits of the Speculative pool</Typography>
      <div style={{ padding: '12px 0'}}>
        <div className={classes.listitem}><CheckIcon color="primary" style={{ paddingRight: '8px'}}/>Cost effective method to create leverage.</div>
        <div className={classes.listitem}><CheckIcon color="primary" style={{ paddingRight: '8px'}}/>No risk of loss beyond the value of tokens in the pool</div>
        <div className={classes.listitem}><CheckIcon color="primary" style={{ paddingRight: '8px'}}/>No collateral requirement beyond the value of the tokens in the pool</div>
      </div>      
    </CardContent>
      : <ContractInfo></ContractInfo>
      }
    </Card>
    </Paper>
    </div>
</>    
  );
}
