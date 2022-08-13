import { gql } from "@apollo/client";

const POOL_COMMON_FIELDS = gql`
  fragment PoolCommonFields on Pool {
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
`;

export const GET_POOLS_LIST = gql`
  ${POOL_COMMON_FIELDS}
  query GetPoolsList($offset: Int!, $limit: Int!) {
    pools(skip: $offset, first: $limit) {
      ...PoolCommonFields
    }
  }
`;

export const GET_SAVED_POOLS_LIST = gql`
  ${POOL_COMMON_FIELDS}
  query GetPoolsList($ids: [String!], $offset: Int!, $limit: Int!) {
    pools(where: { id_in: $ids }, skip: $offset, first: $limit) {
      ...PoolCommonFields
    }
  }
`;

export const GET_POOL_DETAILS = gql`
  ${POOL_COMMON_FIELDS}
  query GetPoolDetails($id: String!) {
    pool(id: $id) {
      ...PoolCommonFields
    }
  }
`;

const buildTransactionTypeQuery = (type: string) => `
${type}(
  skip: $offset
  first: $limit
  orderBy: timestamp
  orderDirection: desc
  where: { pool: $id }
  subgraphError: allow
) {
  timestamp
  transaction {
    id
  }
  amountUSD
  __typename
}
`;

export const GET_POOL_TRANSACTIONS = gql`
  query GetPoolTransactions($id: String!, $offset: Int!, $limit: Int!) {
    ${buildTransactionTypeQuery("mints")}
    ${buildTransactionTypeQuery("burns")}
    ${buildTransactionTypeQuery("swaps")}
  }
`;
