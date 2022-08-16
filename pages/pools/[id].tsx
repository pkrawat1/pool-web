import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_POOL_DETAILS, GET_POOL_TRANSACTIONS } from "@/gql/";
import { StarIcon } from "@heroicons/react/solid";
import {
  StarIcon as StarOutlineIcon,
  ArrowLeftIcon,
} from "@heroicons/react/outline";
import { TokenLogo, Loader, TransactionList } from "@/components/";
import { API_ERROR_MSG } from "@/types/";

const Pool: NextPage = () => {
  const router = useRouter();
  const {
    query: { id: poolID },
  } = router;
  const { data: poolDetails, error: poolDetailError } = useQuery(
    GET_POOL_DETAILS,
    {
      variables: { id: poolID },
    }
  );
  const {
    loading: loadingTransaction,
    data: transactionDetails,
    error: transactionError,
  } = useQuery(GET_POOL_TRANSACTIONS, {
    variables: { id: poolID, offset: 0, limit: 100 },
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritePoolIds, setFavoritePoolIds] = useState([]);
  const pool = poolDetails?.pool;
  const transaction = {
    mints: [],
    swaps: [],
    burns: [],
    ...transactionDetails,
  };

  useEffect(() => {
    let storage = localStorage.getItem("favoritePools");
    if (storage) {
      const favIDs = JSON.parse(storage);
      setIsFavorite(favIDs.includes(poolID));
      setFavoritePoolIds(favIDs);
    }
  }, [poolID]);

  const handleToggleFavorite = () => {
    let updatedFavoriteIds: string[] = favoritePoolIds.filter(
      (id) => id !== poolID
    );
    if (!isFavorite) {
      updatedFavoriteIds = [poolID as string, ...favoritePoolIds];
    }
    localStorage.setItem("favoritePools", JSON.stringify(updatedFavoriteIds));
    setIsFavorite(!isFavorite);
  };

  const renderBackButton = () => (
    <button
      className="flex text-blue-500 py-5"
      onClick={() => router.push("/")}
    >
      <ArrowLeftIcon className="w-6" />
      <span className="pl-3">Back to pool page</span>
    </button>
  );

  const renderTitle = () => {
    const { token0, token1 } = pool;
    return (
      <div className="flex justify-between text-gray-900 py-5 text-xl">
        <div className="flex items-center">
          <TokenLogo token={token0} width="24" height="24" />
          <TokenLogo token={token1} width="24" height="24" />
          <span className="ml-2">
            {token0.symbol} / {token1.symbol}
          </span>
        </div>
        <div className="inline-block">{renderFavButton()}</div>
      </div>
    );
  };

  const renderFavButton = () => (
    <button
      type="button"
      onClick={handleToggleFavorite}
      className="rounded-full p-1 text-center border-2 border-yellow-500"
      role="button"
    >
      <span className="sr-only">Save pool</span>
      {isFavorite ? (
        <StarIcon className="w-6 text-yellow-500" />
      ) : (
        <StarOutlineIcon className="w-6 text-yellow-500" />
      )}
    </button>
  );

  const renderBlock = () => (
    <div className="flex sm:max-w-full md:max-w-sm p-6 mt-5 bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="flex flex-col mr-6">
        <h5 className="mb-2 text-l font-bold text-gray-900">
          Tokens value (USD)
        </h5>
        {["token0", "token1"].map((token: string) => (
          <div key={token} className="inline-flex py-1 items-center">
            {pool && <TokenLogo token={pool[token]} />}
            <span className="ml-2">{pool[token].symbol}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col ml-6">
        <h5 className="mb-2 text-l font-bold text-gray-900">TX Count</h5>
        <span className="py-1">{pool.txCount}</span>
      </div>
    </div>
  );

  return (
    <main className="flex mt-5 px-5">
      <div className="container mx-auto max-w-5xl">
        {!pool ? (
          <Loader />
        ) : poolDetailError ? (
          <span className="p-3 no-data-msg">{API_ERROR_MSG}</span>
        ) : (
          <>
            {renderBackButton()}
            {renderTitle()}
            {renderBlock()}
            {transactionError ? (
              <span className="p-3 no-data-msg">{API_ERROR_MSG}</span>
            ) : (
              <TransactionList
                loading={loadingTransaction}
                transaction={transaction}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Pool;
