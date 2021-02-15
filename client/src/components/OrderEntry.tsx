import { Button, CircularProgress, createStyles, FormControl, FormControlLabel, FormHelperText, InputAdornment, makeStyles, Radio, RadioGroup, TextField, Theme } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, ethers, utils } from "ethers";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useERC20Contract } from "../hooks/useERC20Contract";
import { selectAppContext } from "../slices/appContextSlice";
import { approveAsync, selectToken } from "../slices/tokenSlice";
import { mintSpecAsync, mintStableAsync, selectWallet, ValidToken } from "../slices/walletSlice";
import { usePoolsContracts } from "../hooks/usePoolsContracts";
import { isPoolType, PoolType } from "../slices/poolsSlice";

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
    const { approval } = useSelector(selectToken(selectedToken || 'WBNB'));
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
        value = value.replace(/^0+/, '');
        if (!value || value === '0') {
            setFormValues({ ...formValues, amount: '0' });
            setHelperText({ ...helperText, amount: ''});
            setDisableApprove(true);
            setError({ amount: false});    
            return null;        
        }        
        setFormValues({ ...formValues, amount: value });
        const BN = ethers.BigNumber;
        let balance: BigNumber;
        try {
            balance = utils.parseUnits(balances[selectedToken as ValidToken], 18);
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
      const handleApprove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (contract == null) return;
        if (account == null) return;
        if (approval?.status === 'Pending') return;
        setDisableApprove(true);
        const { amount, type } = formValues;
        if (type == 'stable') {
            dispatch(approveAsync(stable, contract, account, amount, selectedToken));            
        }
        if (type == 'spec') {
            dispatch(approveAsync(spec, contract, account, amount, selectedToken));
        }
      };

      const handleChop = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (account == null) return;
        if (approval?.status !== 'Approved') return;
        const { amount, type } = formValues;
        if (type == 'stable') {
            dispatch(mintStableAsync(stable, amount));
        }
        if (type == 'spec') {
            dispatch(mintSpecAsync(spec, amount));
        }
      };

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      };

      useEffect(() => {
        handleAmountChange({ target: { value: formValues.amount }} as React.ChangeEvent<HTMLInputElement>);
    }, [selectedToken, balances])
    if (selectedToken == null || contract == null || account == null) return null;
    if (stepperStage != 2) return null; 
    return (
        <>
            <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" error={error.amount} className={classes.formControl}>
                <TextField error={error.amount} label="Amount" id="filled-start-adornment" value={formValues.amount}
                onChange={handleAmountChange}
                autoComplete="off"
                className={classes.textField}
                InputProps={{
                    endAdornment: <InputAdornment position="end">{selectedToken}</InputAdornment>
                }}
                variant="outlined"
                />
                <FormHelperText className={classes.helperText}>{helperText.amount}</FormHelperText>                                
                <RadioGroup name="tokenType" value={formValues.type} onChange={handleRadioChange}>
                    <FormControlLabel labelPlacement="start" value="spec" control={<Radio color="primary" />} label="Buy Spec Pool" className={classes.radioButton}/>
                    <FormControlLabel labelPlacement="start" value="stable" control={<Radio color="primary" />} label="Buy Stable Pool" className={classes.radioButton}/>
                </RadioGroup>
                <Button type="submit" variant="outlined" color="primary" onClick={handleApprove}
                    disabled={disableApprove || approval?.status === 'Approved'} className={classes.button}>{ approval?.status === "Pending" ? <CircularProgress size={24}/> : 'APPROVAL' }</Button>
                <FormHelperText className={classes.helperText}>{!disableApprove && helperText.approve}</FormHelperText>                                
                <Button type="submit" variant="outlined" color="primary" onClick={handleChop}
                    disabled={approval?.status !== 'Approved'} className={classes.button}>CHOP!</Button>
                <FormHelperText className={classes.helperText}>{helperText.chop}</FormHelperText>                                
            </FormControl>
            </form>        
        </>
    )
}