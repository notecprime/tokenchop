import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppContext, selectTokenAction } from '../../slices/appContextSlice';
import { useBandProtocolContract } from '../../hooks/useBandProtocolContract';
import { getDetailsAsync, selectBandProtocol } from '../../slices/bandProtocolSlice';
import { PriceDisplay } from './PriceDisplay';
import { BalanceDisplay } from './BalanceDisplay';
import { useERC20Contract } from '../../hooks/useERC20Contract';
import { getBalanceOfsAsync, selectToken } from '../../slices/tokenSlice';
import { ERC20PresetMinterPauser } from '../../contracts/external';
import { selectWallet, ValidToken } from '../../slices/walletSlice';
import { usePoolsContracts } from '../../hooks/usePoolsContracts';
import { getPoolsDetailsAsync, PoolsProperties, selectPools } from '../../slices/poolsSlice';
import { PoolBalanceDisplay } from './PoolBalanceDisplay';
import { TotalPoolDisplay } from './TotalPoolDisplay';

const useStyles = makeStyles({
  table: {
    width: '100%'
  },
  tableHead: {
    backgroundColor: 'rgb(63, 81, 181) !important'
  },
  tableHeadCellSymbol: {
    width: '110px',
    color: 'white !important'
  },
  tableHeadCellPrice: {
    width: '110px',
    color: 'white !important'
  },
  tableHeadCellBalance: {
    width: '140px',
    color: 'white !important'
  },      
  tableHeadCellPool: {
    width: '200px',
    color: 'white !important'
  },        
  tableRow: {
      '&:hover': {
          backgroundColor: 'rgb(63, 81, 181, 0.2) !important'
      }
  }
});

function createData(id: number, base: ValidToken, price: string, balance: string, pools: PoolsProperties) {
  return {
    id,
    base,
    price,
    balance,
    spec: pools.spec,
    stable: pools.stable
  };
}

const quotesTableState = {
  loading: true,
  rows: [] as RowData[]
};

interface RowData {
  id: number;
  base: ValidToken;
  price: string;
  balance: string;
  spec: PoolsProperties['spec'];
  stable: PoolsProperties['stable'];
}

export default function QuotesTable() {
  const classes = useStyles();
  const { selectedToken = 'WBNB' } = useSelector(selectAppContext);  
  const { transfer } = useSelector(selectToken(selectedToken));
  const [state, setState] = useState(quotesTableState);
  const { rows, loading } = state;
  const { account, library } = useWeb3React<Web3Provider>();
  const dispatch = useDispatch();
  const { prices } = useSelector(selectBandProtocol);
  const pools = useSelector(selectPools());
  const { balances } = useSelector(selectWallet);
  useEffect(() => {
    const newRows = [
      createData(1, 'WBNB', prices.WBNB, balances.WBNB, pools.WBNB),
      createData(2, 'ETH', prices.ETH, balances.ETH, pools.ETH),
      createData(3, 'BTC', prices.BTC, balances.BTC, pools.BTC),
      createData(4, 'XRP', prices.XRP, balances.XRP, pools.XRP),
      createData(5, 'DAI', prices.DAI, balances.DAI, pools.DAI)
    ];
    setState({...state, rows: newRows});
    }, [prices, balances, pools]
  );
  // Get price from Band Protocol
  const contract = useBandProtocolContract();
  useEffect(() => {
      if (contract != null) {
        dispatch(getDetailsAsync(contract));
      }
    }, []
  );
  // Get balances for the contracts
  const tokens: ValidToken[] = ['WBNB','ETH','BTC','XRP','DAI'];
  const contracts = [
    useERC20Contract('WBNB'),
    useERC20Contract('ETH'),
    useERC20Contract('BTC'),
    useERC20Contract('XRP'),
    useERC20Contract('DAI'),
  ] as ERC20PresetMinterPauser[];
  if (contracts.some(c => c == null)) {
    throw new Error('There should not be an empty contract here');
  }
  useEffect(() => {
    if (account != null){
      dispatch(getBalanceOfsAsync(tokens, contracts, account));
    }
  },[account, library, transfer]);
  // Get details of the pools
  const poolContracts = [
    usePoolsContracts('WBNB'),
    usePoolsContracts('ETH'),
    usePoolsContracts('BTC'),
    usePoolsContracts('XRP'),
    usePoolsContracts('DAI'),
  ];
  if (contracts.some(c => c == null)) {
    throw new Error('There should not be an empty contract here');
  }
  useEffect(() => {
    if (account != null){
      dispatch(getPoolsDetailsAsync(tokens, poolContracts, account));
    }
  },[account, library, transfer]);
  


  return (
      <>
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.tableHeadCellSymbol}>Symbol</TableCell>
            <TableCell align="right" className={classes.tableHeadCellPrice}>Price(BUSD)</TableCell>
            <TableCell align="right" className={classes.tableHeadCellBalance}>Wallet</TableCell>
            <TableCell align="right" className={classes.tableHeadCellBalance}>Spec(BUSD)</TableCell>
            <TableCell align="right" className={classes.tableHeadCellBalance}>Stable(BUSD)</TableCell>
            <TableCell align="right" className={classes.tableHeadCellPool}>Spec Pool</TableCell>
            <TableCell align="right" className={classes.tableHeadCellPool}>Stable Pool</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} onClick={() => { dispatch(selectTokenAction(row.base))}} className={classes.tableRow}>
              <TableCell component="th" scope="row">{row.base}</TableCell>
              <TableCell align="right"><PriceDisplay value={row.price}/></TableCell>
              <TableCell align="right"><BalanceDisplay value={row.balance}/></TableCell>
              <TableCell align="right"><PoolBalanceDisplay {...row.spec}/></TableCell>
              <TableCell align="right"><PoolBalanceDisplay {...row.stable}/></TableCell>
              <TableCell align="right"><TotalPoolDisplay {...row.spec} base={row.base}/></TableCell>
              <TableCell align="right"><TotalPoolDisplay {...row.stable} base={row.base}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
