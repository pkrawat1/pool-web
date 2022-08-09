import { gql } from '@apollo/client';

export const GET_POOLS_LIST = gql`
  query GetPoolsList {
    pools(first: 5) {
      id
      txCount
      totalValueLockedUSD
      volumeUSD
      token0 { symbol }
      token1 { symbol }
    }
  }
`;
