import { useActiveWeb3React } from '.'
import { abi as TOKENCHOP_SPEC_ABI } from '../contracts/TokenChopSpec.json';
import { abi as TOKENCHOP_STABLE_ABI } from '../contracts/TokenChopStable.json';
import { TokenChopSpec, TokenChopStable } from '../contracts'
import { useContract } from './useContract'
import { STABLE_POOL_ADDRESS, SPEC_POOL_ADDRESS } from '../constants';
import { ValidToken } from '../slices/walletSlice';


export type PoolsContracts = {
  spec: TokenChopSpec;
  stable: TokenChopStable;
}

export function usePoolsContracts(token: ValidToken): PoolsContracts {
  const { chainId } = useActiveWeb3React();
  if (!chainId) {
    throw Error(`No chain ID!`);
  }
  if (!token) {
    throw Error(`Token ID is invalid`);
  }  
  const spec = useContract<TokenChopSpec>(SPEC_POOL_ADDRESS[token][chainId], TOKENCHOP_SPEC_ABI, true)
  const stable = useContract<TokenChopStable>(STABLE_POOL_ADDRESS[token][chainId], TOKENCHOP_STABLE_ABI, true)
  if (!spec || !stable) {
    throw Error(`Failed to get Pool Contracts for ${token}`);
  }
  return { spec, stable };
}
