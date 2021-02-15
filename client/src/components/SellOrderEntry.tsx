import { Button, CircularProgress, createStyles, FormControl, FormControlLabel, FormHelperText, InputAdornment, makeStyles, Paper, Radio, RadioGroup, TextField, Theme, Typography } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, ethers, utils } from "ethers";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useERC20Contract } from "../hooks/useERC20Contract";
import { selectAppContext } from "../slices/appContextSlice";
import { selectToken } from "../slices/tokenSlice";
import { burnAsync, selectWallet } from "../slices/walletSlice";
import { usePoolsContracts } from "../hooks/usePoolsContracts";
import { isPoolType, PoolType, selectPoolsByToken, selectPools } from "../slices/poolsSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: '60px'
    },
    textField: {
      align: 'right',
      margin: '3px',
      width: '25ch'
    },
    orderButton: {
        lineHeight: '52px',
        height: '52px',
        fontSize: '18px',
    },
    formControl: {
        margin: theme.spacing(3),
      },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
    radioButton: {
        marginRight: '30px'
    },
    helperText: {
        textAlign: 'right',
        paddingRight: '8px'        
    },
    header: {
        color: '#fff',
        backgroundColor: '#3f51b5',
        borderRadius: '20px 20px 0 0',
        padding: '16px 20px'
    }
  }),
);

type FormValues = {
    amount: string,
    type: PoolType
}

export default function OrderEntry(){
    const classes = useStyles();
    const dispatch = useDispatch();    
    const { stepperStage, selectedToken = 'WBNB' } = useSelector(selectAppContext);
    const { account } = useWeb3React<Web3Provider>()      
    const contract = useERC20Contract(selectedToken);
    const { spec, stable } = usePoolsContracts(selectedToken);
    const pools = useSelector(selectPoolsByToken(selectedToken));
    const { transfer } = useSelector(selectToken(selectedToken || 'WBNB'));
    const { balances } = useSelector(selectWallet);
    const [formValues, setFormValues] = React.useState<FormValues>({ amount: '0', type: 'stable' });
    const [disableApprove, setDisableApprove] = React.useState(true);
    const [error, setError] = React.useState({ amount: false}); 
    const [helperText, setHelperText] = React.useState({
        amount: '',
        approve: 'You must approve the transaction first',
        chop: ''
    });
    function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
        const mightBePoolType = (event.target as HTMLInputElement).value;
        setFormValues({ ...formValues, type: isPoolType(mightBePoolType) });
    };

    function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
        let value = (event.target as HTMLInputElement).value;
        value = value.replace(/^0{2,}/, '0');
        value = value.replace(/^0[^\.].*/, value.slice(1));
        if (!value || value === '0') {
            setFormValues({ ...formValues, amount: '0' });
            setHelperText({ ...helperText, amount: ''});
            setDisableApprove(true);
            setError({ amount: false});    
            return null;        
        }        
        setFormValues({ ...formValues, amount: value });
        let balance: BigNumber;
        try {
            const { type } = formValues;
            balance = utils.parseUnits(pools[isPoolType(type)].balanceOf, 18);
        } catch (err) {
            console.log(err);
            setError({ amount: true});
            setDisableApprove(true);
            setHelperText({ ...helperText, amount: `Unexpected balance for ${selectedToken}`});
            return null;
        }
        let validBN;
        try {
            validBN = utils.parseUnits(value, 18);
        } catch (error) {
            setError({ amount: true});
            setDisableApprove(true);
            setHelperText({ ...helperText, amount: 'Not a valid amount'});
            return null;
        }
        if (balance.lt(validBN)) {
            setError({ amount: true});
            setDisableApprove(true);
            setHelperText({ ...helperText, amount: 'You do not enough'});            
            return null;
        }
        value = value.replace(/^\./, '0.');
        setFormValues({ ...formValues, amount: value });
        setHelperText({ ...helperText, amount: ''});
        setDisableApprove(false);
        setError({ amount: false});
      };

      const handleChop = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (account == null) return;
        if (transfer?.status !== 'None') return;        
        const { amount, type } = formValues;
        const contractToUse = (type == 'stable') ? stable : spec;
        const { quoteToSupplyFactor } = pools[type];
        dispatch(burnAsync(contractToUse, amount, selectedToken, account, quoteToSupplyFactor));
      };

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      };

      useEffect(() => {
        handleAmountChange({ target: { value: formValues.amount }} as React.ChangeEvent<HTMLInputElement>);
    }, [selectedToken, balances])
    if (selectedToken == null || contract == null || account == null) return null;
    if (stepperStage != 2) return null; 
    if (parseFloat(pools.spec.balanceOf) == 0 && parseFloat(pools.stable.balanceOf) == 0) return null;
    return (
        <Paper variant="outlined" elevation={4}>
            <div className={classes.header}>
                <Typography>SELL</Typography>
            </div>            
            <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" error={error.amount} className={classes.formControl}>
                <TextField error={error.amount} label="Amount" id="filled-start-adornment" value={formValues.amount}
                onChange={handleAmountChange}
                autoComplete="off"
                className={classes.textField}
                InputProps={{
                    endAdornment: <InputAdornment position="end">BUSD</InputAdornment>
                }}
                variant="outlined"
                />
                <FormHelperText className={classes.helperText}>{helperText.amount}</FormHelperText>                                
                <RadioGroup name="tokenType" value={formValues.type} onChange={handleRadioChange}>
                    <FormControlLabel labelPlacement="start" value="spec" control={<Radio color="primary" />} label="Spec Pool" className={classes.radioButton}/>
                    <FormControlLabel labelPlacement="start" value="stable" control={<Radio color="primary" />} label="Stable Pool" className={classes.radioButton}/>
                </RadioGroup>
                <Button type="submit" variant="outlined" color="primary" onClick={handleChop}
                    disabled={transfer?.status == 'PendingSell' || transfer?.status == 'PendingBuy'} className={classes.button}>{ transfer?.status === "PendingSell" ? <CircularProgress size={24}/> : 'SELL' }</Button>
                <FormHelperText className={classes.helperText}>{helperText.chop}</FormHelperText>                                
            </FormControl>
            </form>      
        </Paper>
    )
}