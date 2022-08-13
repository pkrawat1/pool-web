import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Home from "@/pages/";
import "@testing-library/jest-dom";
import { GET_POOLS_LIST } from "@/gql/";
import { MAX_POOL, MAX_POOL_PAGE, MAX_TABLE_SIZE } from "@/types/";

describe("Home", () => {
  it("renders without error", async () => {
    const mocks = [
      {
        request: {
          query: GET_POOLS_LIST,
          variables: { offset: 0, limit: MAX_TABLE_SIZE },
          notifyOnNetworkStatusChange: true,
        },
        result: {
          data: {
            pools: {
              id: "0x00cef0386ed94d738c8f8a74e8bfd0376926d24c",
              txCount: "11329",
              totalValueLockedUSD: "24631273.77982835932191393258546832",
              volumeUSD: "379393208.1369457145920522387135823",
              token0: {
                id: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
                symbol: "BUSD",
              },
              token1: {
                id: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                symbol: "USDC",
              },
            },
          },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    expect(await screen.findByText("All pools here")).toBeInTheDocument();
    expect(
      await screen.findByText(`Page 1 of ${MAX_TABLE_SIZE}`)
    ).toBeInTheDocument();
  });
});
