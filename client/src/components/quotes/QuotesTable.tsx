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
import { selectToken } from '../../slices/appContextSlice';
import { useBandProtocolContract } from '../../hooks/useBandProtocolContract';
import { getDetailsAsync, selectBandProtocol } from '../../slices/bandProtocolSlice';
import { PriceDisplay } from './PriceDisplay';
import { BalanceDisplay } from './BalanceDisplay';
import { useERC20Contract } from '../../hooks/useERC20Contract';
import { getBalanceOfsAsync } from '../../slices/tokenSlice';
import { ERC20PresetMinterPauser } from '../../contracts/external';
import { selectWallet, ValidToken } from '../../slices/walletSlice';
// #3f51b5
const useStyles = makeStyles({
  table: {
    width: '390px'
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
    width: '170px',
    color: 'white !important'
  },      
  tableRow: {
      '&:hover': {
          backgroundColor: 'rgb(63, 81, 181, 0.2) !important'
      }
  }
});

function createData(id: number, base: ValidToken, price: string, balance: string) {
  return { id, base, price, balance };
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
}

export default function QuotesTable() {
  const classes = useStyles();
  const [state, setState] = useState(quotesTableState);
  const { rows, loading } = state;
  const { account, library } = useWeb3React<Web3Provider>();
  const dispatch = useDispatch();
  const { prices } = useSelector(selectBandProtocol);
  const { balances } = useSelector(selectWallet);
  useEffect(() => {
    const newRows = [
      createData(1, 'BNB', prices.BNB, balances.BNB),
      createData(2, 'ETH', prices.ETH, balances.ETH),
      createData(3, 'BTC', prices.BTC, balances.BTC),
      createData(4, 'XRP', prices.XRP, balances.XRP),
      createData(5, 'DAI', prices.DAI, balances.DAI)
    ];
    setState({...state, rows: newRows});
    }, [prices, balances]
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
  const tokens = ['BNB','ETH','BTC','XRP','DAI'];
  const contracts = [
    useERC20Contract('BNB'),
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
  },[account, library]);
  
  return (
      <>
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.tableHeadCellSymbol}>Symbol</TableCell>
            <TableCell align="right" className={classes.tableHeadCellPrice}>Price (USD)</TableCell>
            <TableCell align="right" className={classes.tableHeadCellBalance}>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} onClick={() => { dispatch(selectToken(row.base))}} className={classes.tableRow}>
              <TableCell component="th" scope="row">{row.base}</TableCell>
              <TableCell align="right"><PriceDisplay value={row.price}/></TableCell>
              <TableCell align="right"><BalanceDisplay value={row.balance}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
