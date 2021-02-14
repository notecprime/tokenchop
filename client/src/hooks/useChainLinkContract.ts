import { useActiveWeb3React } from '.'
import { abi as CHAINLINK_ABI } from '../contracts/AggregatorV3Interface.json';
import { AggregatorV3Interface } from '../contracts'
import { useContract } from './useContract'
import { ChainLinkSymbols, CHAINLINK_BNBUSD_PROTOCOL_ADDRESS, CHAINLINK_BTCUSD_PROTOCOL_ADDRESS, CHAINLINK_ETHUSD_PROTOCOL_ADDRESS } from '../constants';

export function useChainLinkContract(symbol: ChainLinkSymbols): AggregatorV3Interface | null {
  const { chainId } = useActiveWeb3React();
  let address;
  if (chainId) {
    switch(symbol) {
      case 'WBNB': {
        address = CHAINLINK_BNBUSD_PROTOCOL_ADDRESS[chainId];
        break;
      }
      case 'BTC': {
        address = CHAINLINK_BTCUSD_PROTOCOL_ADDRESS[chainId];
        break;
      }
      case 'ETH': {
        address = CHAINLINK_ETHUSD_PROTOCOL_ADDRESS[chainId];
        break;
      }        
    }  
  };
  const contract = useContract<AggregatorV3Interface>(address, CHAINLINK_ABI, true)
  return contract;
}
