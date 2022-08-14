import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Home from "@/pages/";
import "@testing-library/jest-dom";
import { GET_POOLS_LIST } from "@/gql/";
import { IPool, MAX_POOL, MAX_POOL_PAGE, MAX_TABLE_SIZE } from "@/types/";
import { bigNumFormatter } from '@/lib/';

describe("Home", () => {
  const mocks = [
    {
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
  ];
  it("renders without data", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    expect(await screen.findByText("All pools here")).toBeInTheDocument();
    expect(
      await screen.findByText(`Page 1 of ${MAX_TABLE_SIZE}`)
    ).toBeInTheDocument();
  });
  it("renders with data", async () => {
    const pool: IPool = mocks[0].result.data.pools[0];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    expect(await screen.findByText(`${pool.token0.symbol}/${pool.token1.symbol}`)).toBeInTheDocument();
    expect(await screen.findByText(pool.txCount)).toBeInTheDocument();
    expect(await screen.findByText(`$${bigNumFormatter(pool.totalValueLockedUSD)}`)).toBeInTheDocument();
    expect(
      await screen.findByText(`Page 1 of ${Math.ceil(MAX_POOL/MAX_TABLE_SIZE)}`)
    ).toBeInTheDocument();
  });
});
