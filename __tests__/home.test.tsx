import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Home from "@/pages/";
import "@testing-library/jest-dom";
import { ALL_POOL_MOCK_GQL, SAVED_POOL_MOCK_GQL } from "../gql/mock";
import { API_ERROR_MSG, IPool, MAX_POOL, MAX_TABLE_SIZE } from "@/types/";
import { bigNumFormatter } from "@/lib/";

describe("Home: All Pools", () => {
  it("renders without data", async () => {
    render(
      <MockedProvider mocks={[SAVED_POOL_MOCK_GQL.page1]} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    expect(await screen.findAllByText(API_ERROR_MSG)).toHaveLength(1);
  });

  it("renders with data", async () => {
    const pool: IPool = ALL_POOL_MOCK_GQL.page1.result.data.pools[0];
    render(
      <MockedProvider mocks={[ALL_POOL_MOCK_GQL.page1]} addTypename={false}>
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
    let pool: IPool = ALL_POOL_MOCK_GQL.page2.result.data.pools[0];
    const { getByText } = render(
      <MockedProvider mocks={[ALL_POOL_MOCK_GQL.page1, ALL_POOL_MOCK_GQL.page2]} addTypename={false}>
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
    pool = ALL_POOL_MOCK_GQL.page1.result.data.pools[0];
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

  it("renders with error message on error", async () => {
    render(
      <MockedProvider mocks={[ALL_POOL_MOCK_GQL.error]} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    expect(await screen.findAllByText(API_ERROR_MSG)).toHaveLength(2);
  });
});

describe("Home: Favorite Pools", () => {
  it("renders without data", async () => {
    render(
      <MockedProvider mocks={[ALL_POOL_MOCK_GQL.page1]} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    expect(await screen.findAllByText(API_ERROR_MSG)).toHaveLength(1);
  });

  it("renders with data", async () => {
    const pool: IPool = SAVED_POOL_MOCK_GQL.page1.result.data.pools[0];
    render(
      <MockedProvider mocks={[SAVED_POOL_MOCK_GQL.page1]} addTypename={false}>
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
    let pool: IPool = SAVED_POOL_MOCK_GQL.page2.result.data.pools[0];
    const { getByText } = render(
      <MockedProvider mocks={[SAVED_POOL_MOCK_GQL.page1, SAVED_POOL_MOCK_GQL.page2]} addTypename={false}>
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
    pool = SAVED_POOL_MOCK_GQL.page1.result.data.pools[0];
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

  it("renders with error message on error", async () => {
    render(
      <MockedProvider mocks={[SAVED_POOL_MOCK_GQL.error]} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    expect(await screen.findAllByText(API_ERROR_MSG)).toHaveLength(2);
  });
});
