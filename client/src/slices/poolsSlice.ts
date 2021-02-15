import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { utils } from 'ethers';
import { ValidToken } from './walletSlice';
import { PoolsContracts } from '../hooks/usePoolsContracts';

export type ChopStatus = 'Complete' | 'Pending' | 'NotStarted';

const poolTypes = ['spec', 'stable'] as const;
export type PoolType = typeof poolTypes[number];
export function isPoolType(mightBe: string): PoolType {
  const poolType = poolTypes.find(name => name === mightBe);
  if (poolType) {
      return poolType;
  }
  throw new Error(`${mightBe} is not a pool type`);
}

export interface SinglePoolProperties {
  totalSupply: string,
  balanceOf: string,
  collateral: string
}
export type PoolsProperties = Record<PoolType, SinglePoolProperties>;
export type PoolsState = Record<ValidToken, PoolsProperties>;

export const initialState: PoolsState = {
  WBNB: {
    spec: {
      totalSupply: '0',
      balanceOf: '0',
      collateral: '0'
    },
    stable: {
      totalSupply: '0',
      balanceOf: '0',
      collateral: '0'
    }
  },
  ETH: {
    spec: {
      totalSupply: '0',
      balanceOf: '0',
      collateral: '0'
    },
    stable: {
      totalSupply: '0',
      balanceOf: '0',
      collateral: '0'
    }
  },
  BTC: {
    spec: {
      totalSupply: '0',
      balanceOf: '0',
      collateral: '0'
    },
    stable: {
      totalSupply: '0',
      balanceOf: '0',
      collateral: '0'
    }
  },
  XRP: {
    spec: {
      totalSupply: '0',
      balanceOf: '0',
      collateral: '0'
    },
    stable: {
      totalSupply: '0',
      balanceOf: '0',
      collateral: '0'
    }
  },
  DAI: {
    spec: {
      totalSupply: '0',
      balanceOf: '0',
      collateral: '0'
    },
    stable: {
      totalSupply: '0',
      balanceOf: '0',
      collateral: '0'
    }
  }    
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    updateDetails: (_, action: PayloadAction<PoolsState>) => {
      return action.payload;
    } 
  }
});
const { updateDetails } = tokenSlice.actions;

export const getPoolsDetailsAsync = (names: ValidToken[], contracts: PoolsContracts[], account: string): AppThunk => async dispatch => {
  const balances = await Promise.all(contracts.map(
    async c => await Promise.all([
      await c.stable.totalSupply(),
      await c.stable.balanceOf(account),
      await c.stable.collateral(),
      await c.spec.totalSupply(),
      await c.spec.balanceOf(account),
      await c.spec.collateral()
    ])
  ));
  const details = names.reduce((acc, name, idx) => {
    const balance = balances[idx];
    acc[name] = {
      stable: {
        totalSupply: utils.formatUnits(balance[0], 18),
        balanceOf: utils.formatUnits(balance[1], 18),
        collateral: utils.formatUnits(balance[2], 18)
      },
      spec: {
        totalSupply: utils.formatUnits(balance[3], 18),
        balanceOf: utils.formatUnits(balance[4], 18),
        collateral: utils.formatUnits(balance[5], 18)
      }    
    };
    return acc;
  }, {} as PoolsState)
  dispatch(updateDetails(details));
};

export const selectPools = () => (state: RootState) => {
  return state.pools || {};
}

export default tokenSlice.reducer;
