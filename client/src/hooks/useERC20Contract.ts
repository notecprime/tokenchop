import { useActiveWeb3React } from '.'
import { abi as TOKEN_ABI } from '../../../node_modules/@openzeppelin/contracts/build/contracts/ERC20PresetMinterPauser.json';
import { ERC20PresetMinterPauser } from '../contracts/external'
import { useContract } from './useContract'
import { TOKEN_ADDRESS } from '../constants';
import { ValidToken } from '../slices/walletSlice';

export function useERC20Contract(tokenName?: ValidToken): ERC20PresetMinterPauser | null {
  const { chainId } = useActiveWeb3React();
  const address = chainId && tokenName ? TOKEN_ADDRESS[tokenName][chainId] : undefined;
  const contract = useContract<ERC20PresetMinterPauser>(address, TOKEN_ABI, true)
  return contract;
}
