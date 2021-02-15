import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import appContextReducer, { initialState as appContextState } from './slices/appContextSlice';
import bandProtocolReducer, { initialState as bandProtocolState } from './slices/bandProtocolSlice';
import poolsReducer, { initialState as poolsState } from './slices/poolsSlice';
import tokenReducer, { initialState as tokenState } from './slices/tokenSlice';
import walletReducer, { initialState as walletState } from './slices/walletSlice';

export const reducer = combineReducers(
  {
    appContext: appContextReducer,
    bandProtocol: bandProtocolReducer,
    pools: poolsReducer,
    token: tokenReducer,
    wallet: walletReducer
  }
);

export const initialState = {
  appContext: appContextState,
  bandProtocol: bandProtocolState,
  pools: poolsState,
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
