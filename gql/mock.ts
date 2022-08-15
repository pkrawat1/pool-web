import {
  GET_POOLS_LIST,
  GET_POOL_DETAILS,
  GET_POOL_TRANSACTIONS,
} from "@/gql/";
import { MAX_TABLE_SIZE } from "@/types/";
import { GraphQLError } from "graphql";

export const ALL_POOL_MOCK_GQL = {
  error: {
    request: {
      query: GET_POOLS_LIST,
      variables: { offset: 0, limit: MAX_TABLE_SIZE },
    },
    result: { errors: [new GraphQLError("Error!")] },
  },
  page1: {
    request: {
      query: GET_POOLS_LIST,
      variables: { offset: 0, limit: MAX_TABLE_SIZE },
    },
    result: {
      data: {
        pools: [
          {
            id: "0x0002e63328169d7feea121f1e32e4f620abf0352",
            txCount: "2234",
            totalValueLockedUSD: "36546.66156526307665493049801506958",
            volumeUSD: "0",
            token0: {
              id: "0x0d438f3b5175bebc262bf23753c1e53d03432bde",
              symbol: "wNXM",
            },
            token1: {
              id: "0x903bef1736cddf2a537176cf3c64579c3867a881",
              symbol: "ICHI",
            },
            __typename: "Pool",
          },
        ],
      },
    },
  },
  page2: {
    request: {
      query: GET_POOLS_LIST,
      variables: { offset: 1 * MAX_TABLE_SIZE, limit: MAX_TABLE_SIZE },
    },
    result: {
      data: {
        pools: [
          {
            id: "0x000ea4a83acefdd62b1b43e9ccc281f442651520",
            txCount: "1414",
            totalValueLockedUSD: "12690.21913386369073003568721093818",
            volumeUSD: "4786550.668987781707381611519508175",
            token0: {
              id: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
              symbol: "BUSD",
              __typename: "Token",
            },
            token1: {
              id: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
              symbol: "WETH",
              __typename: "Token",
            },
            __typename: "Pool",
          },
        ],
      },
    },
  },
};

export const SAVED_POOL_MOCK_GQL = {
  error: {
    request: {
      query: GET_POOLS_LIST,
      variables: { offset: 0, limit: MAX_TABLE_SIZE },
    },
    result: { errors: [new GraphQLError("Error!")] },
  },
  page1: {
    request: {
      query: GET_POOLS_LIST,
      variables: { offset: 0, limit: MAX_TABLE_SIZE },
    },
    result: {
      data: {
        pools: [
          {
            id: "0x0002e63328169d7feea121f1e32e4f620abf0352",
            txCount: "2234",
            totalValueLockedUSD: "36546.66156526307665493049801506958",
            volumeUSD: "0",
            token0: {
              id: "0x0d438f3b5175bebc262bf23753c1e53d03432bde",
              symbol: "wNXM",
            },
            token1: {
              id: "0x903bef1736cddf2a537176cf3c64579c3867a881",
              symbol: "ICHI",
            },
            __typename: "Pool",
          },
        ],
      },
    },
  },
  page2: {
    request: {
      query: GET_POOLS_LIST,
      variables: { offset: 1 * MAX_TABLE_SIZE, limit: MAX_TABLE_SIZE },
    },
    result: {
      data: {
        pools: [
          {
            id: "0x000ea4a83acefdd62b1b43e9ccc281f442651520",
            txCount: "1414",
            totalValueLockedUSD: "12690.21913386369073003568721093818",
            volumeUSD: "4786550.668987781707381611519508175",
            token0: {
              id: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
              symbol: "BUSD",
              __typename: "Token",
            },
            token1: {
              id: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
              symbol: "WETH",
              __typename: "Token",
            },
            __typename: "Pool",
          },
        ],
      },
    },
  },
};

export const POOL_DETAIL_MOCK_GQL = {
  error: {
    request: {
      query: GET_POOL_DETAILS,
      variables: { id: "0x0002e63328169d7feea121f1e32e4f620abf0352" },
    },
    result: { errors: [new GraphQLError("Error!")] },
  },
  detail: {
    request: {
      query: GET_POOL_DETAILS,
      variables: { id: "0x0002e63328169d7feea121f1e32e4f620abf0352" },
    },
    result: {
      data: {
        pool: {
          id: "0x0002e63328169d7feea121f1e32e4f620abf0352",
          txCount: "1414",
          totalValueLockedUSD: "12690.21913386369073003568721093818",
          volumeUSD: "4786550.668987781707381611519508175",
          token0: {
            id: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
            symbol: "BUSD",
            __typename: "Token",
          },
          token1: {
            id: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            symbol: "WETH",
            __typename: "Token",
          },
          __typename: "Pool",
        },
      },
    },
  },
};

export const POOL_TRANSACTION_GQL = {
  error: {
    request: {
      query: GET_POOL_TRANSACTIONS,
      variables: {
        id: "0x0002e63328169d7feea121f1e32e4f620abf0352",
        offset: 0,
        limit: 100,
      },
    },
    result: { errors: [new GraphQLError("Error!")] },
  },
  transactions: {
    request: {
      query: GET_POOL_TRANSACTIONS,
      variables: {
        id: "0x0002e63328169d7feea121f1e32e4f620abf0352",
        offset: 0,
        limit: 100,
      },
    },
    result: {
      data: {
        mints: [
          {
            timestamp: "1642788072",
            transaction: {
              id: "0x9e75b63bc7bfa81f52080e877e065b6d85557d6640b635be0f7500114beefbd2",
              __typename: "Transaction",
            },
            amountUSD: "5317.545512538456699652660673346437",
            __typename: "Mint",
          },
        ],
        burns: [
          {
            timestamp: "1645972492",
            transaction: {
              id: "0x7e80c69203f868063572be5ca900dc88861493d0d47a2c2ce3c4963c73913025",
              __typename: "Transaction",
            },
            amountUSD: "484.3277791346611388915692265086075",
            __typename: "Burn",
          },
        ],
        swaps: [
          {
            timestamp: "1651749520",
            transaction: {
              id: "0xcffc7f793aa9a442ceccbca204645536a5aa477fe8ece1547e21c4effee2449f",
              __typename: "Transaction",
            },
            amountUSD: "0",
            __typename: "Swap",
          },
        ],
      },
    },
  },
};
