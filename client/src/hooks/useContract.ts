import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'
import { useActiveWeb3React } from '.'
import { getContract } from '../utils'

export function useContract<T extends Contract>(address: string | undefined, ABI: any, withSignerIfPossible = true): T | null {
    const { library, account } = useActiveWeb3React()
  
    return useMemo(() => {
      if (!address || !ABI || !library) return null
      try {
        return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined) as T
      } catch (error) {
        console.error('Failed to get contract', error)
        return null
      }
    }, [address, ABI, library, withSignerIfPossible, account])
}
