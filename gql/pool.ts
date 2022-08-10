import { gql } from "@apollo/client";

export const GET_POOLS_LIST = gql`
  query GetPoolsList($offset: Int!, $limit: Int!) {
    pools(skip: $offset, first: $limit) {
      id
      txCount
      totalValueLockedUSD
      volumeUSD
      token0 {
        symbol
      }
      token1 {
        symbol
      }
    }
  }
`;

export const GET_SAVED_POOLS_LIST = gql`
  query GetPoolsList($ids: [String!], $offset: Int!, $limit: Int!) {
    pools(where: { id_in: $ids }, skip: $offset, first: $limit) {
      id
      txCount
      totalValueLockedUSD
      volumeUSD
      token0 {
        symbol
      }
      token1 {
        symbol
      }
    }
  }
`;

export const GET_POOL_DETAILS = gql`
  query GetPoolDetails($id: String!) {
    pool(id: $id) {
      id
      txCount
      totalValueLockedUSD
      volumeUSD
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
    }
  }
`;

export const GET_POOL_TRANSACTIONS = (type: string) => gql`
  query GetPoolTransactions($poolID: String!, $offset: Int!, $limit: Int!) {
    ${type}(
      skip: $offset
      first: $limit
      orderBy: timestamp
      orderDirection: desc
      where: { pool: $poolID }
      subgraphError: allow
    ) {
      timestamp
      transaction {
        id
      }
      amountUSD
      __typename
    }
  }
`;
