import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/react";
import { render, screen } from "@testing-library/react";
import { POOL_DETAIL_MOCK_GQL } from "../gql/mock";
import Pool from "@/pages/pools/[id]";
import { API_ERROR_MSG } from "@/types/";

describe("Detail: Pool Details", () => {
  beforeEach(() => {
    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    useRouter.mockImplementation(() => ({
      route: `/pools/${POOL_DETAIL_MOCK_GQL.detail.result.data.pool.id}`,
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    }));
  });

  it("renders the network error", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Pool />
      </MockedProvider>
    );
    expect(await screen.findAllByText(API_ERROR_MSG)).toHaveLength(1);
  });
  it("renders the pool detail block", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Pool />
      </MockedProvider>
    );
    expect(await screen.findAllByText(API_ERROR_MSG)).toHaveLength(1);
  });
  it.skip("renders the back button to home page", () => {});
  it.skip("renders the Favorite button to save pool", () => {});
});

describe("Detail: Transactions table", () => {
  it("renders the network error", async () => {
    render(
      <MockedProvider mocks={[POOL_DETAIL_MOCK_GQL.detail]} addTypename={false}>
        <Pool />
      </MockedProvider>
    );
    expect(await screen.findAllByText(API_ERROR_MSG)).toHaveLength(1);
  });
  it.skip("renders without data", () => {});
  it.skip("renders with data", () => {});
  it.skip("renders with error", () => {});
  it.skip("renders with filtered transactions", () => {});
});
