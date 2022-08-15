import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/react";
import { render, screen } from "@testing-library/react";
import { POOL_DETAIL_MOCK_GQL, POOL_TRANSACTION_GQL } from "../gql/mock";
import Pool from "@/pages/pools/[id]";
import { API_ERROR_MSG, TransactionType } from "@/types/";
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
  it("renders the pool details", async () => {
    render(
      <MockedProvider mocks={[POOL_DETAIL_MOCK_GQL.detail]} addTypename={false}>
        {renderPool()}
      </MockedProvider>
    );
    expect(await screen.findAllByText("Tokens value (USD)")).toHaveLength(1);
    expect(
      await screen.findAllByText(
        POOL_DETAIL_MOCK_GQL.detail.result.data.pool.txCount
      )
    ).toHaveLength(1);
    expect(await screen.findAllByText("Back to pool page")).toHaveLength(1);
    expect(await screen.findAllByText("Save pool")).toHaveLength(1);
  });
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
  it("renders with data", async () => {
    render(
      <MockedProvider
        mocks={[POOL_DETAIL_MOCK_GQL.detail, POOL_TRANSACTION_GQL.transactions]}
        addTypename={false}
      >
        {renderPool()}
      </MockedProvider>
    );
    expect(await screen.findAllByText("Transactions")).toHaveLength(1);
    expect(await screen.findAllByText("All")).toHaveLength(1);
    (["mints", "swaps", "burns"] as TransactionType[]).map(async (type) => {
      expect(
        await screen.findAllByText(
          `${POOL_TRANSACTION_GQL.transactions.result.data[
            type
          ][0].transaction.id.slice(0, 15)}...`
        )
      ).toHaveLength(1);
    });
  });
});
