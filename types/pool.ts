export interface IPool {
  id: string
  txCount: string
  totalValueLockedUSD: string
  volumeUSD: string
  token0: IToken0
  token1: IToken1
}

export interface IToken0 {
  symbol: string
}

export interface IToken1 {
  symbol: string
}