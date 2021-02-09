import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InjectedConnector } from '@web3-react/injected-connector';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { ChainId, SUPPORTED_CHAIN_IDS, TOKENCHOP_PAIR_ADDRESS } from '../constants';
import { AppThunk, RootState } from '../store';
import { BscConnector } from '@binance-chain/bsc-connector';
import { ERC20PresetMinterPauser } from '../contracts/external';
import { utils } from 'ethers';
import { TokenChopPair } from '../contracts';
import { updateStage } from './appContextSlice';

export type ValidToken = 'BNB' | 'ETH' | 'BTC' | 'XRP' | 'DAI';

interface WalletState {
    connected: boolean;
    balances: {
      BNB: string,
      ETH: string,
      BTC: string,
      XRP: string,
      DAI: string
    };
}

export const initialState: WalletState = {
    connected: false,
    balances: {
      BNB: '0',
      ETH: '0',
      BTC: '0',
      XRP: '0',
      DAI: '0',
    }
};

interface BalancesDetails {
  BNB: string,
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

export const sendAsync = (contract: TokenChopPair): AppThunk => async dispatch => {
  const result = await contract.buyHigh();
  console.log(result);
  dispatch(updateConnected(true));
};

export const revertAsync = (contract: TokenChopPair): AppThunk => async dispatch => {
  const result = await contract.cancel();
  console.log(result);  
  dispatch(updateConnected(true));
};

export const selectWallet = (state: RootState) => state.wallet;

export default walletSlice.reducer;