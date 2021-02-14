import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { utils } from 'ethers';
import { ERC20PresetMinterPauser } from '../contracts/external';
import { updateBalances, ValidToken } from './walletSlice';
import { TokenChopSpec, TokenChopStable } from '../contracts';

export type ApprovalStatus = 'Approved' | 'Pending' | 'NotApproved';

interface TokenProperties {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  balanceOf: string;
  approval: {
    status: ApprovalStatus;
    amountInWei: string;
  }
}

export type TokenState = Record<string, TokenProperties>;

export const initialState: TokenState = {
  WBNB: {
    name: 'WBNB',
    symbol: '',
    decimals: 18,
    totalSupply: '',
    balanceOf: '',
    approval: { status: 'NotApproved', amountInWei: '0' }
  },
  ETH: {
    name: 'ETH',
    symbol: '',
    decimals: 18,
    totalSupply: '',
    balanceOf: '',
    approval: { status: 'NotApproved', amountInWei: '0' }
  },
  BTC: {
    name: 'BTC',
    symbol: '',
    decimals: 18,
    totalSupply: '',
    balanceOf: '',
    approval: { status: 'NotApproved', amountInWei: '0' }
  },
  XRP: {
    name: 'XRP',
    symbol: '',
    decimals: 18,
    totalSupply: '',
    balanceOf: '',
    approval: { status: 'NotApproved', amountInWei: '0' }
  },
  DAI: {
    name: 'DAI',
    symbol: '',
    decimals: 18,
    totalSupply: '',
    balanceOf: '',
    approval: { status: 'NotApproved', amountInWei: '0' }
  }
};

interface TokenDetails {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
}

interface TokenBalanceOf {
  name: string;
  balanceOf: string;
}

interface TokenApproval {
  name: ValidToken;
  status: ApprovalStatus;
  amountInWei: string;
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    updateDetails: (state, action: PayloadAction<TokenDetails>) => {
      const { name } = action.payload;
      if (!name) return;
      const token = state[name]
        ? { ...state[name], ...action.payload }
        : { ...action.payload, balanceOf: '0', approval: { status: 'NotApproved' as ApprovalStatus, amountInWei: '0'} };
      return { ...state, [name]: token };
    },
    updateBalanceOf: (state, action: PayloadAction<TokenBalanceOf>) => {
      const { name, balanceOf } = action.payload;
      if (!name || !state[name]) return;
      return {
        ...state,
        [name]: {
          ...state[name],
          balanceOf
        }
      };
    },
    updateApproval: (state, action: PayloadAction<TokenApproval>) => {
      const { name, status, amountInWei } = action.payload;
      if (!name) return;
      if (!state[name]) return;
      const token = { ...state[name], approval: { status, amountInWei }};
      return { ...state, [name]: token };
    }
  }
});
const { updateApproval, updateDetails, updateBalanceOf } = tokenSlice.actions;

export const getDetailsAsync = (contract: ERC20PresetMinterPauser): AppThunk => async dispatch => {
  const [name, symbol, decimals, totalSupply] = await Promise.all([
    await contract.name(),
    await contract.symbol(),
    await contract.decimals(),
    await contract.totalSupply()
  ]);
  dispatch(updateDetails({
    name,
    symbol,
    decimals,
    totalSupply: totalSupply.toString()
  }));
};

export const getBalanceOfAsync = (contract: ERC20PresetMinterPauser, account: string, tokenName: ValidToken): AppThunk => async dispatch => {
  const balanceOf = await contract.balanceOf(account);
  dispatch(updateBalanceOf({ name: tokenName, balanceOf: balanceOf.toString()}));
};

export const getBalanceOfsAsync = (tokenNames: string[], contracts: ERC20PresetMinterPauser[], account: string): AppThunk => async dispatch => {
  const balances = await Promise.all(contracts.map(
    async c => await c.balanceOf(account)
  ));
  dispatch(updateBalances({
    WBNB: utils.formatUnits(balances[0], 18),
    ETH: utils.formatUnits(balances[1], 18),
    BTC: utils.formatUnits(balances[2], 18),
    XRP: utils.formatUnits(balances[3], 18),
    DAI: utils.formatUnits(balances[4], 18)
  }));  
};

export const approveAsync = (
  poolContract: TokenChopStable | TokenChopSpec,
  contract: ERC20PresetMinterPauser,
  account: string,
  amount: string,
  name: ValidToken
): AppThunk => async dispatch => {
  dispatch(updateApproval({ name, status: 'Pending', amountInWei: '0'}));  
  const approveAmount = utils.parseEther(amount).toString();
  let result;
  try {
    const filter = contract.filters.Approval(account, poolContract.address, null);
    contract.on(filter, (address, account, amount) => {
      dispatch(updateApproval({name, status: 'Approved', amountInWei: approveAmount}));
    });
    result = await contract.approve(poolContract.address, approveAmount);
  } catch (err) {
    if (err.code === "4001") {
      // user cancelled
      return;
    }
    debugger;
  }
};

export const selectToken = (tokenName: string) => (state: RootState) => {
  return state.token[tokenName] || {};
}

export default tokenSlice.reducer;
