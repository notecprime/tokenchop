import { useActiveWeb3React } from '.'
import { abi as TOKENCHOP_FACTORY_ABI } from '../contracts/TokenChopFactory.json';
import { TokenChopFactory } from '../contracts'
import { useContract } from './useContract'
import { TOKENCHOP_FACTORY_ADDRESS } from '../constants';

export function useTokenChopFactoryContract(): TokenChopFactory | null {
  const { chainId } = useActiveWeb3React();
  const address = chainId ? TOKENCHOP_FACTORY_ADDRESS[chainId] : undefined;
  const contract = useContract<TokenChopFactory>(address, TOKENCHOP_FACTORY_ABI, true)
  return contract;
}
