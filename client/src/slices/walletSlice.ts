import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InjectedConnector } from '@web3-react/injected-connector';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { SUPPORTED_CHAIN_IDS } from '../constants';
import { AppThunk, RootState } from '../store';
import { BscConnector } from '@binance-chain/bsc-connector';
import { constants, utils } from 'ethers';
import { updateStage } from './appContextSlice';
import { updateTransfer } from './tokenSlice';
import { TokenChopSpec, TokenChopStable } from '../contracts';

const validTokens = ['WBNB', 'ETH', 'BTC', 'XRP', 'DAI'] as const;
export type ValidToken = typeof validTokens[number];
export function isValidToken(mightBe: string): ValidToken {
  const validToken = validTokens.find(name => name === mightBe);
  if (validToken) {
      return validToken;
  }
  throw new Error(`${mightBe} is not a valid token`);
}

interface WalletState {
    connected: boolean;
    balances: {
      WBNB: string,
      ETH: string,
      BTC: string,
      XRP: string,
      DAI: string
    };
}

export const initialState: WalletState = {
    connected: false,
    balances: {
      WBNB: '0',
      ETH: '0',
      BTC: '0',
      XRP: '0',
      DAI: '0',
    }
};

interface BalancesDetails {
  WBNB: string,
  ETH: string,
  BTC: string,
  XRP: string,
  DAI: string
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateConnected: (state, action: PayloadAction<boolean>) => {
        state.connected = action.payload;
    },
    updateBalances: (state, action: PayloadAction<BalancesDetails>) => {
      state.balances = action.payload;
    }    
  },
});
export const { updateBalances, updateConnected } = walletSlice.actions;

type activateFn = (connector: AbstractConnector, onError?: (error: Error) => void, throwErrors?: boolean) => Promise<void>;

export const connectAsync = (activate: activateFn ): AppThunk => async dispatch => {
  await connectToWallet(dispatch, activate, new InjectedConnector({ supportedChainIds: SUPPORTED_CHAIN_IDS }));
};

export const connectBscAsync = (activate: activateFn): AppThunk => async dispatch => {
  await connectToWallet(dispatch, activate, new BscConnector({ supportedChainIds: SUPPORTED_CHAIN_IDS}));
};

const connectToWallet = async (dispatch: any, activate: activateFn, connector: AbstractConnector) => {
  try {
    await activate(connector, undefined, true);
  } catch(err) {
    if (err.constructor.name === 'UnsupportedChainIdError') {
      dispatch(updateStage({ mainWindowStage: 'FailedConnection', errorReason: 'Unsupported ChainId. Only the Binance Smart Chain Testnet is supported' }));
      return;
    }
    if (err.constructor.name === 'UserRejectedRequestError') {
      dispatch(updateStage({ mainWindowStage: 'AwaitingConnection' }));
      return;
    }    
    dispatch(updateStage({ mainWindowStage: 'FailedConnection', errorReason: 'Unexpected error. Unable to connect to the wallet' }));
  }
  dispatch(updateConnected(true));
  dispatch(updateStage({ mainWindowStage: 'SelectToken' }));
}

export const disconnectAsync = (connector?: AbstractConnector ): AppThunk => async dispatch => {
  connector?.deactivate();
  dispatch(updateConnected(false));
  dispatch(updateStage({ mainWindowStage: 'AwaitingConnection' }));  
};

export const mintAsync = (contract: TokenChopStable | TokenChopSpec, amount: string, name: ValidToken, account: string): AppThunk => async dispatch => {
  dispatch(updateTransfer({ name, status: 'PendingBuy' }));
  const baseAmount = utils.parseEther(amount).toString();
  let result;
  try {
    const filter = contract.filters.Transfer(constants.AddressZero, account, null);
    contract.on(filter, (address, account, amount) => {
      dispatch(updateTransfer({name, status: 'None' }));
    });
    result = await contract.mintAtBaseAmount(baseAmount);    
  } catch (err) {
    if (err.code === "4001") {
      // user cancelled
      return;
    }
    if (err.code === "-32603") {
      // nonce mismatch
      throw new Error("tx mismatch. please reset metamask account");
    }    
  }
};

export const burnAsync = (contract: TokenChopStable | TokenChopSpec, amount: string, name: ValidToken, account: string, quoteToSupplyFactor: string): AppThunk => async dispatch => {
  dispatch(updateTransfer({ name, status: 'PendingSell' }));
  const scaleBN = utils.parseEther('1');  
  const quoteAmountBN = utils.parseEther(amount);
  const quoteToSupplyFactorBN = utils.parseEther(quoteToSupplyFactor);
  const supplyAmount = quoteAmountBN.mul(scaleBN).div(quoteToSupplyFactorBN).toString();
  let result;
  try {
    const filter = contract.filters.Transfer(account, constants.AddressZero, null);
    contract.on(filter, (address, account, amount) => {
      dispatch(updateTransfer({name, status: 'None' }));
    });
    result = await contract.burn(supplyAmount);
  } catch (err) {
    if (err.code === "4001") {
      // user cancelled
      return;
    }
    if (err.code === "-32603") {
      // nonce mismatch
      throw new Error("tx mismatch. please reset metamask account");
    }    
  }
};

export const selectWallet = (state: RootState) => state.wallet;

export default walletSlice.reducer;