import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ValidToken } from './walletSlice';

export type MainWindowStage =
    'AwaitingConnection' |
    'FailedConnection' |
    'SelectToken' |
    'PlaceOrder';

interface AppContextState {
    mainWindowStage: MainWindowStage,
    stepperStage: -1 | 0 | 1 | 2,
    selectedToken?: ValidToken,
    errorReason?: string
}

export const initialState: AppContextState = {
    mainWindowStage: 'AwaitingConnection',
    stepperStage: 0
};

interface UpdateStageDetails {
  mainWindowStage: MainWindowStage,
  errorReason?: string
}

export const appContextSlice = createSlice({
  name: 'appContext',
  initialState,
  reducers: {
    updateStage: (state, action: PayloadAction<UpdateStageDetails>) => {
      const { mainWindowStage, errorReason } = action.payload;
      state.mainWindowStage = mainWindowStage;
      if (mainWindowStage == 'AwaitingConnection') {
        state.errorReason = undefined;  
        state.stepperStage = 0;
      } else if (mainWindowStage == 'FailedConnection') {
        state.stepperStage = -1;
        state.errorReason = errorReason;
      } else if (mainWindowStage == 'SelectToken') {
        state.stepperStage = 1;
      } else if (mainWindowStage == 'PlaceOrder') {
        state.stepperStage = 2;
      }
    },
    selectTokenAction: (state, action: PayloadAction<ValidToken>) => {
      state.selectedToken = action.payload;
      state.mainWindowStage = 'PlaceOrder';
      state.stepperStage = 2;
    }    
  }
});
export const { selectTokenAction, updateStage } = appContextSlice.actions;

export const selectAppContext = (state: RootState) => state.appContext;

export default appContextSlice.reducer;
