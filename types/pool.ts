export interface IPool {
  id: string
  txCount: string
  totalValueLockedUSD: string
  volumeUSD: string
  token0: IToken
  token1: IToken
}

export interface IToken {
  id: string,
  symbol: string
}
