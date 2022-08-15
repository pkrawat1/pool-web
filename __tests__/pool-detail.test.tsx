import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/react";
import { render, screen } from "@testing-library/react";
import { POOL_DETAIL_MOCK_GQL, POOL_TRANSACTION_GQL } from "../gql/mock";
import Pool from "@/pages/pools/[id]";
import { API_ERROR_MSG } from "@/types/";
import { createMockRouter } from "@/lib/";
import { RouterContext } from "next/dist/shared/lib/router-context";

const renderPool = () => (
  <RouterContext.Provider
    value={createMockRouter({
      query: {
        id: POOL_DETAIL_MOCK_GQL.detail.result.data.pool.id,
      },
    } as any)}
  >
    <Pool />
  </RouterContext.Provider>
);

describe("Detail: Pool Details", () => {

  beforeEach(() => {
    jest.mock("next/router", () => {
      useRouter: () => {
        query: {
          id: `/pools/${POOL_DETAIL_MOCK_GQL.detail.result.data.pool.id}`;
        }
      };
    });
  });

  it("renders the network error", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        {renderPool()}
      </MockedProvider>
    );
    expect(await screen.findAllByText(API_ERROR_MSG)).toHaveLength(1);
  });
  it("renders the pool detail block", async () => {
    render(
      <MockedProvider
        mocks={[POOL_DETAIL_MOCK_GQL.detail]}
        addTypename={false}
      >
        {renderPool()}
      </MockedProvider>
    );
    expect(await screen.findAllByText("Tokens value (USD)")).toHaveLength(1);
  });
  it.skip("renders the back button to home page", () => {});
  it.skip("renders the Favorite button to save pool", () => {});
});

describe("Detail: Transactions table", () => {
  it("renders the network error", async () => {
    render(
      <MockedProvider mocks={[POOL_DETAIL_MOCK_GQL.detail]} addTypename={false}>
        {renderPool()}
      </MockedProvider>
    );
    expect(await screen.findAllByText(API_ERROR_MSG)).toHaveLength(1);
  });
  it.skip("renders without data", () => {});
  it.skip("renders with data", () => {});
  it.skip("renders with error", () => {});
  it.skip("renders with filtered transactions", () => {});
});
