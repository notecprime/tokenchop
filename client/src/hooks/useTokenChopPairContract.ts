import { useActiveWeb3React } from '.'
import { abi as TOKENCHOP_PAIR_ABI } from '../contracts/TokenChopPair.json';
import { TokenChopPair } from '../contracts'
import { useContract } from './useContract'
import { TOKENCHOP_PAIR_ADDRESS } from '../constants';

export function useTokenChopPairContract(): TokenChopPair | null {
  const { chainId } = useActiveWeb3React();
  const address = chainId ? TOKENCHOP_PAIR_ADDRESS[chainId] : undefined;
  const contract = useContract<TokenChopPair>(address, TOKENCHOP_PAIR_ABI, true)
  return contract;
}
