import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { utils } from 'ethers';
import { AggregatorV3Interface } from '../contracts';
import { ChainLinkSymbols } from '../constants';

interface ChainLinkProperties {
  symbol: ChainLinkSymbols;  
  price: string
}

export type ChainLinkState = Record<string, ChainLinkProperties>;

export const initialState: ChainLinkState = {
};

interface ChainLinkDetails {
  symbol: ChainLinkSymbols;
  price: string
}

export const chainLinkSlice = createSlice({
  name: 'chainLink',
  initialState,
  reducers: {
    updateDetails: (state, action: PayloadAction<ChainLinkDetails>) => {
      const { symbol, price } = action.payload;
      if (!symbol) return;
      const chainLink = state[symbol]
        ? { ...state[symbol], ...action.payload }
        : { ...action.payload };
      return { ...state, [symbol]: chainLink };
    }    
  }
});
const { updateDetails } = chainLinkSlice.actions;

export const getDetailsAsync = (contract: AggregatorV3Interface, symbol: ChainLinkSymbols): AppThunk => async dispatch => {
  const [roundData] = await Promise.all([
    await contract.latestRoundData()
  ]);
  const [, price,,,] = roundData;
  dispatch(updateDetails({
    symbol,
    price: price.toString()
  }));
};

export const selectChainLink = (symbol: string) => (state: RootState) => {
  return state.chainLink[symbol] || {};
}

export default chainLinkSlice.reducer;
