import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import appContextReducer, { initialState as appContextState } from './slices/appContextSlice';
import bandProtocolReducer, { initialState as bandProtocolState } from './slices/bandProtocolSlice';
import chainLinkReducer, { initialState as chainLinkState } from './slices/chainLinkSlice';
import factoryReducer, { initialState as factoryState } from './slices/factorySlice';
import tokenReducer, { initialState as tokenState } from './slices/tokenSlice';
import walletReducer, { initialState as walletState } from './slices/walletSlice';

export const reducer = combineReducers(
  {
    appContext: appContextReducer,
    bandProtocol: bandProtocolReducer,
    chainLink: chainLinkReducer,
    factory: factoryReducer,
    token: tokenReducer,
    wallet: walletReducer
  }
);

export const initialState = {
  appContext: appContextState,
  bandProtocol: bandProtocolState,
  chainLink: chainLinkState,
  factory: factoryState,
  token: tokenState,
  walletState
}

export const store = configureStore({
  reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
