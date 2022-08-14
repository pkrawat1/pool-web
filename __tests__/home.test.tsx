import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Home from "@/pages/";
import "@testing-library/jest-dom";
import { GET_POOLS_LIST } from "@/gql/";
import { IPool, MAX_POOL, MAX_POOL_PAGE, MAX_TABLE_SIZE } from "@/types/";
import { bigNumFormatter } from "@/lib/";
import { act } from "react-dom/test-utils";

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
    {
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
                __typename: "Token"
              },
              token1: {
                id: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                symbol: "WETH",
                __typename: "Token"
              },
              __typename: "Pool"
            }
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
    expect(
      await screen.findByText(`${pool.token0.symbol}/${pool.token1.symbol}`)
    ).toBeInTheDocument();
    expect(await screen.findByText(pool.txCount)).toBeInTheDocument();
    expect(
      await screen.findByText(`$${bigNumFormatter(pool.totalValueLockedUSD)}`)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        `Page 1 of ${Math.ceil(MAX_POOL / MAX_TABLE_SIZE)}`
      )
    ).toBeInTheDocument();
  });

  it("renders data with page navigation", async () => {
    let pool: IPool = mocks[1].result.data.pools[0];
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    expect(await screen.findByText(/Next/)).toBeInTheDocument();
    // Next Page navigation
    fireEvent.click(getByText("Next"));
    expect(
      await screen.findByText(`${pool.token0.symbol}/${pool.token1.symbol}`)
    ).toBeInTheDocument();
    expect(await screen.findByText(pool.txCount)).toBeInTheDocument();
    expect(
      await screen.findByText(`$${bigNumFormatter(pool.totalValueLockedUSD)}`)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        `Page 2 of ${Math.ceil(MAX_POOL / MAX_TABLE_SIZE)}`
      )
    ).toBeInTheDocument();
      
    //  Previous page navigation
    pool = mocks[0].result.data.pools[0];
    fireEvent.click(getByText("Previous"));
    expect(
      await screen.findByText(`${pool.token0.symbol}/${pool.token1.symbol}`)
    ).toBeInTheDocument();
    expect(await screen.findByText(pool.txCount)).toBeInTheDocument();
    expect(
      await screen.findByText(`$${bigNumFormatter(pool.totalValueLockedUSD)}`)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        `Page 1 of ${Math.ceil(MAX_POOL / MAX_TABLE_SIZE)}`
      )
    ).toBeInTheDocument();
  });
});
