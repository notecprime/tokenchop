import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { utils } from 'ethers';
import { IStdReference } from '../contracts';

interface BandProtocolState {
  prices: {
    BNB: string,
    ETH: string,
    BTC: string,
    XRP: string,
    DAI: string
  }
}

export const initialState: BandProtocolState = {
  prices: {
    BNB: '0',
    ETH: '0',
    BTC: '0',
    XRP: '0',
    DAI: '0',
  }
};

interface BandProtocolDetails {
  BNB: string,
  ETH: string,
  BTC: string,
  XRP: string,
  DAI: string
}

export const bandProtocolSlice = createSlice({
  name: 'bandProtocol',
  initialState,
  reducers: {
    updateDetails: (state, action: PayloadAction<BandProtocolDetails>) => {
      const { BNB, ETH, BTC, XRP, DAI } = action.payload;
      state.prices = { BNB, ETH, BTC, XRP, DAI };
    }    
  }
});
const { updateDetails } = bandProtocolSlice.actions;

export const getDetailsAsync = (contract: IStdReference): AppThunk => async dispatch => {
  const [rates] = await Promise.all([
    await contract.getReferenceDataBulk(['BNB', 'ETH', 'BTC', 'XRP', 'DAI'],['BUSD','BUSD','BUSD','BUSD','BUSD'])
  ]);
  dispatch(updateDetails({
    BNB: utils.formatUnits(rates[0].rate, 18),
    ETH: utils.formatUnits(rates[1].rate, 18),
    BTC: utils.formatUnits(rates[2].rate, 18),
    XRP: utils.formatUnits(rates[3].rate, 18),
    DAI: utils.formatUnits(rates[4].rate, 18)
  }));
};

export const selectBandProtocol = (state: RootState) => state.bandProtocol;

export default bandProtocolSlice.reducer;
