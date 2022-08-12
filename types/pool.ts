import { IToken } from '@/types/';

export interface IPool {
  id: string;
  txCount: string;
  totalValueLockedUSD: string;
  volumeUSD: string;
  token0: IToken;
  token1: IToken;
}

export interface IPoolTransaction {
  mints: IMint[];
  swaps: ISwap[];
  burns: IBurn[];
}

export interface IMint {
  timestamp: string;
  transaction: ITransaction;
  owner: string;
  sender: string;
  origin: string;
  amount0: string;
  amount1: string;
  amountUSD: string;
  __typename: string;
}

export interface ISwap {
  timestamp: string;
  transaction: ITransaction;
  origin: string;
  amount0: string;
  amount1: string;
  amountUSD: string;
  __typename: string;
}

export interface IBurn {
  timestamp: string;
  transaction: ITransaction;
  owner: string;
  amount0: string;
  amount1: string;
  amountUSD: string;
  __typename: string;
}
export interface ITransaction {
  id: string;
}
