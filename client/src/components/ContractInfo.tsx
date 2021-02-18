import { Button, Card, CardContent, Link, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';
import React from 'react';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    message: {
      display: 'flex',
      justifyContent: 'space-between',
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
      flexDirection: 'column',
    },
    cardContents: {
      display: 'flex',
      flexDirection: 'column'
    },
    contractLink: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline'
    }
  })
);

export default function ContractInfo() {
  const classes = useStyles();
  return (
      <CardContent className={classes.cardContents}>
        <Typography variant="h5">Contract Addresses</Typography>
        <div className={classes.contractGroup}>
          <div className={classes.contractLink}> 
            <Typography variant="body2">TokenChopFactory</Typography>
            <Link href="https://testnet.bscscan.com/address/0x721241fe78f48f386E6Fb29a2535572Fc690199e" target="_blank" style={{ paddingLeft: '6px' }}>0x721241fe78f48f386E6Fb29a2535572Fc690199e</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">TokenChopSpecFactory</Typography>
            <Link href="https://testnet.bscscan.com/address/0xB32a43bc28cb95AA12C83320B330D47e5007cf60" target="_blank" style={{ paddingLeft: '6px' }}>0xB32a43bc28cb95AA12C83320B330D47e5007cf60</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">TokenChopStableFactory</Typography>
            <Link href="https://testnet.bscscan.com/address/0xFdb950ebeD62900624264C4Fb51eBEA61171914C" target="_blank" style={{ paddingLeft: '6px' }}>0xFdb950ebeD62900624264C4Fb51eBEA61171914C</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">TokenChopStable (WBNB/BUSD)</Typography>
            <Link href="https://testnet.bscscan.com/address/0x68bc4408Cc0Cd5C9A84c40f95553df50D54F5d2E" target="_blank" style={{ paddingLeft: '6px' }}>0x68bc4408Cc0Cd5C9A84c40f95553df50D54F5d2E</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">TokenChopSpec (WBNB/BUSD)</Typography>
            <Link href="https://testnet.bscscan.com/address/0x4E02e6BF75c1894C805e59433C26D76CbB1E9950" target="_blank" style={{ paddingLeft: '6px' }}>0x4E02e6BF75c1894C805e59433C26D76CbB1E9950</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">TokenChopStable (ETH/BUSD)</Typography>
            <Link href="https://testnet.bscscan.com/address/0xb9A5e888192713c9E4d6005Da9D441bbd431D442" target="_blank" style={{ paddingLeft: '6px' }}>0xb9A5e888192713c9E4d6005Da9D441bbd431D442</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">TokenChopSpec (ETH/BUSD)</Typography>
            <Link href="https://testnet.bscscan.com/address/0x1b7CF1a8088Ab8738A4C38BebD3c34515f125bf9" target="_blank" style={{ paddingLeft: '6px' }}>0x1b7CF1a8088Ab8738A4C38BebD3c34515f125bf9</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">TokenChopStable (BTC/BUSD)</Typography>
            <Link href="https://testnet.bscscan.com/address/0xDD6021CfB0dc12b287d42A44cB09361ABbf6234b" target="_blank" style={{ paddingLeft: '6px' }}>0xDD6021CfB0dc12b287d42A44cB09361ABbf6234b</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">TokenChopSpec (BTC/BUSD)</Typography>
            <Link href="https://testnet.bscscan.com/address/0xf7FD68F477F31EE88e6e55191E95f8Da8e79F500" target="_blank" style={{ paddingLeft: '6px' }}>0xf7FD68F477F31EE88e6e55191E95f8Da8e79F500</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">TokenChopStable (XRP/BUSD)</Typography>
            <Link href="https://testnet.bscscan.com/address/0xe1F603dDdC524c1ac6D9728D8AC580960a9FC25C" target="_blank" style={{ paddingLeft: '6px' }}>0xe1F603dDdC524c1ac6D9728D8AC580960a9FC25C</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">TokenChopSpec (XRP/BUSD)</Typography>
            <Link href="https://testnet.bscscan.com/address/0x01096bb743CB1A86147ab8ef2b4b744ADc79639d" target="_blank" style={{ paddingLeft: '6px' }}>0x01096bb743CB1A86147ab8ef2b4b744ADc79639d</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">TokenChopStable (DAI/BUSD)</Typography>
            <Link href="https://testnet.bscscan.com/address/0xAf5A68f6461eD3C19d8BaF789d08d41e219c99a1" target="_blank" style={{ paddingLeft: '6px' }}>0xAf5A68f6461eD3C19d8BaF789d08d41e219c99a1</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">TokenChopSpec (DAI/BUSD)</Typography>
            <Link href="https://testnet.bscscan.com/address/0xe407E9A7EF6b875A40aB2eB59Ace72Dadc00eBC8" target="_blank" style={{ paddingLeft: '6px' }}>0xe407E9A7EF6b875A40aB2eB59Ace72Dadc00eBC8</Link>
          </div>
        </div>
        <Typography variant="h5" style={{ padding: '24px 0 0 0'}}>Token Contract Addresses</Typography>
        <div className={classes.contractGroup}>
          <div className={classes.contractLink}> 
            <Typography variant="body2">Get these tokens from the </Typography>
            <Link href="https://testnet.binance.org/faucet-smart"  target="_blank" style={{ paddingLeft: '6px' }}>Binance Smart Chain Faucet</Link>          
          </div>          
          <div className={classes.contractLink}> 
            <Typography variant="body2">WBNB</Typography>
            <Link href="https://testnet.bscscan.com/address/0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd" target="_blank" style={{ paddingLeft: '6px' }}>0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">ETH</Typography>
            <Link href="https://testnet.bscscan.com/address/0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378" target="_blank" style={{ paddingLeft: '6px' }}>0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">BTC</Typography>
            <Link href="https://testnet.bscscan.com/address/0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8" target="_blank" style={{ paddingLeft: '6px' }}>0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">XRP</Typography>
            <Link href="https://testnet.bscscan.com/address/0xa83575490D7df4E2F47b7D38ef351a2722cA45b9" target="_blank" style={{ paddingLeft: '6px' }}>0xa83575490D7df4E2F47b7D38ef351a2722cA45b9</Link>
          </div>
          <div className={classes.contractLink}> 
            <Typography variant="body2">DAI</Typography>
            <Link href="https://testnet.bscscan.com/address/0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867" target="_blank" style={{ paddingLeft: '6px' }}>0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867</Link>
          </div>
        </div>

      </CardContent>
  );
}