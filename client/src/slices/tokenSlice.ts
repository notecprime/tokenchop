import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { utils } from 'ethers';
import { ERC20PresetMinterPauser } from '../contracts/external';
import { updateBalances, ValidToken } from './walletSlice';
import { TokenChopPair } from '../contracts';

export type ApprovalStatus = 'Approved' | 'Pending' | 'NotApproved';
export type ChopStatus = 'Complete' | 'Pending' | 'NotStarted';
export type ChopType = 'high' | 'low';

interface TokenProperties {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  balanceOf: string;
  approval: {
    status: ApprovalStatus;
    amountInWei: string;
  },
  chop: {
    status: ChopStatus,
    type?: ChopType
  }
}

export type TokenState = Record<string, TokenProperties>;

export const initialState: TokenState = {
  BNB: {
    name: 'BNB',
    symbol: '',
    decimals: 18,
    totalSupply: '',
    balanceOf: '',
    approval: { status: 'NotApproved', amountInWei: '0' },
    chop: { status: 'NotStarted' }
  },
  ETH: {
    name: 'ETH',
    symbol: '',
    decimals: 18,
    totalSupply: '',
    balanceOf: '',
    approval: { status: 'NotApproved', amountInWei: '0' },
    chop: { status: 'NotStarted' }
  },
  BTC: {
    name: 'BTC',
    symbol: '',
    decimals: 18,
    totalSupply: '',
    balanceOf: '',
    approval: { status: 'NotApproved', amountInWei: '0' },
    chop: { status: 'NotStarted' }
  },
  XRP: {
    name: 'XRP',
    symbol: '',
    decimals: 18,
    totalSupply: '',
    balanceOf: '',
    approval: { status: 'NotApproved', amountInWei: '0' },
    chop: { status: 'NotStarted' }
  },
  DAI: {
    name: 'DAI',
    symbol: '',
    decimals: 18,
    totalSupply: '',
    balanceOf: '',
    approval: { status: 'NotApproved', amountInWei: '0' },
    chop: { status: 'NotStarted' }
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
  name: string;
  status: ApprovalStatus;
  amountInWei: string;
}

interface TokenChop {
  name: string;
  status: ChopStatus;
  type?: ChopType;
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
        : { ...action.payload, balanceOf: '0', approval: { status: 'NotApproved' as ApprovalStatus, amountInWei: '0'}, chop: { status: 'NotStarted' as ChopStatus } };
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
    },
    updateChop: (state, action: PayloadAction<TokenChop>) => {
      const { name, status, type } = action.payload;
      if (!name) return;
      if (!state[name]) return;
      const token = { ...state[name], chop: { status, type }};
      return { ...state, [name]: token };
    }    
  }
});
const { updateApproval, updateChop, updateDetails, updateBalanceOf } = tokenSlice.actions;

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
    BNB: utils.formatUnits(balances[0], 18),
    ETH: utils.formatUnits(balances[1], 18),
    BTC: utils.formatUnits(balances[2], 18),
    XRP: utils.formatUnits(balances[3], 18),
    DAI: utils.formatUnits(balances[4], 18)
  }));  
};

export const approveAsync = (contract: ERC20PresetMinterPauser, account: string, amount: string, name: ValidToken): AppThunk => async dispatch => {
  dispatch(updateApproval({ name, status: 'Pending', amountInWei: '0'}));  
  const tokenChopAddress = '0xeFFEa4030f19C9588c7cE864ae5553745717766B';
  const approveAmount = utils.parseEther(amount).toString();
  let result;
  try {
    const filter = contract.filters.Approval(account, tokenChopAddress, null);
    contract.on(filter, (address, account, amount) => {
      dispatch(updateApproval({name, status: 'Approved', amountInWei: approveAmount}));
    });
    result = await contract.approve(tokenChopAddress, approveAmount);
  } catch (err) {
    if (err.code === "4001") {
      // user cancelled
      return;
    }
    debugger;
  }
};

export const chopAsync = (contract: TokenChopPair, name: ValidToken, amount: string, type: ChopType ): AppThunk => async dispatch => {
  dispatch(updateChop({ name, status: 'Pending', type }));
  const tokenChopAddress = '0xeFFEa4030f19C9588c7cE864ae5553745717766B';
  const chopAmount = utils.parseEther(amount).toString();
  let result;
  try {
    // const filter = contract.filters.Transfer(account, tokenChopAddress, null);
    // contract.on(filter, (address, account, amount) => {
    //   dispatch(updateChop({name, status: 'Approved', amountInWei: approveAmount}));
    // });
    result = type === 'high'
       ? await contract.mintLowToken(name, chopAmount)
       : await contract.mintHighToken(name, chopAmount);
  } catch (err) {
    if (err.code === "4001") {
      // user cancelled
      return;
    }
    debugger;
  }
};


export const mintAsync = (contract: ERC20PresetMinterPauser, account: string, tokenName: string): AppThunk => async dispatch => {
  const amount = utils.parseEther('2').toString();
  const result = await contract.mint(account, amount);
  await result.wait();
  const balanceOf = await contract.balanceOf(account);
  dispatch(updateBalanceOf({ name: tokenName, balanceOf: balanceOf.toString()}));
};

export const selectToken = (tokenName: string) => (state: RootState) => {
  return state.token[tokenName] || {};
}

export default tokenSlice.reducer;
