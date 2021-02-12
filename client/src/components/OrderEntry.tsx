import { Button, CircularProgress, createStyles, FormControl, FormControlLabel, FormHelperText, InputAdornment, makeStyles, Radio, RadioGroup, TextField, Theme } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, ethers, utils } from "ethers";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useERC20Contract } from "../hooks/useERC20Contract";
import { selectAppContext } from "../slices/appContextSlice";
import { approveAsync, selectToken } from "../slices/tokenSlice";
import { selectWallet, ValidToken } from "../slices/walletSlice";
import { useTokenChopFactoryContract } from "../hooks/useTokenChopFactoryContract";
import { chopAsync, ChopType, selectFactory } from "../slices/factorySlice";

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

export default function OrderEntry(){
    const classes = useStyles();
    const dispatch = useDispatch();    
    const { stepperStage, selectedToken } = useSelector(selectAppContext);
    const { account } = useWeb3React<Web3Provider>()      
    const contract = useERC20Contract(selectedToken);
    const chopContract = useTokenChopFactoryContract();
    const { approval } = useSelector(selectToken(selectedToken || 'BNB'));
    const { chop } = useSelector(selectFactory(selectedToken || 'BNB'));
    const { balances } = useSelector(selectWallet);
    const [formValues, setFormValues] = React.useState({ amount: '0', type: 'low' });
    const [disableApprove, setDisableApprove] = React.useState(true);
    const [error, setError] = React.useState({ amount: false}); 
    const [helperText, setHelperText] = React.useState({
        amount: '',
        approve: 'You must approve the transaction first',
        chop: ''
    });
    function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = (event.target as HTMLInputElement).value;
        setFormValues({ ...formValues, type: value });
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
        dispatch(approveAsync(contract, account, formValues.amount, selectedToken || 'BNB'));
      };

      const handleChop = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (chopContract == null) return;
        if (account == null) return;
        if (approval?.status !== 'Approved') return;
        if (chop?.status === 'Pending') return;
        dispatch(chopAsync(chopContract, selectedToken || 'BNB', formValues.amount, formValues.type as ChopType));
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
                    <FormControlLabel labelPlacement="start" value="high" control={<Radio color="primary" />} label="Buy Spec Pool" className={classes.radioButton}/>
                    <FormControlLabel labelPlacement="start" value="low" control={<Radio color="primary" />} label="Buy Stable Pool" className={classes.radioButton}/>
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