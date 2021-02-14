import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBandProtocolContract } from '../hooks/useBandProtocolContract';
import { getDetailsAsync, selectBandProtocol } from '../slices/bandProtocolSlice';
import { selectWallet } from '../slices/walletSlice';
import { CurrencyDisplay } from './CurrencyDisplay';

export const BandProtocol = () => {
    const { prices } = useSelector(selectBandProtocol);
    const { connected } = useSelector(selectWallet);
    const dispatch = useDispatch();
    const contract = useBandProtocolContract();
    return connected && contract ? (
        <div>
            <CurrencyDisplay value={prices.WBNB}></CurrencyDisplay>
            <button type="button" onClick={() => dispatch(getDetailsAsync(contract))}>Get Details</button>
        </div>
    ) : null
}