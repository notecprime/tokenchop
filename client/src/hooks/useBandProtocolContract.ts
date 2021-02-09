import { useActiveWeb3React } from '.'
import { abi as BAND_PROTOCOL_ABI } from '../contracts/IStdReference.json';
import { IStdReference } from '../contracts'
import { useContract } from './useContract'
import { BAND_PROTOCOL_ADDRESS } from '../constants';

export function useBandProtocolContract(): IStdReference | null {
  const { chainId } = useActiveWeb3React();
  const address = chainId ? BAND_PROTOCOL_ADDRESS[chainId] : undefined;
  const contract = useContract<IStdReference>(address, BAND_PROTOCOL_ABI, true)
  return contract;
}
