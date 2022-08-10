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
import { tokenImgSrc } from "@/lib/";
import Image from "next/image";

const Pool: NextPage = ({}) => {
  const router = useRouter();
  const {
    query: { id: poolID },
  } = router;
  const { data: poolDetails } = useQuery(GET_POOL_DETAILS, {
    variables: { id: poolID },
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritePoolIds, setFavoritePoolIds] = useState([]);

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

  const renderTitle = () => (
    <div className="flex text-gray-900 py-5 text-xl">
      {renderTokenLogo("token0")} {renderTokenLogo("token1")}
      <span className="ml-2">
        {poolDetails?.pool?.token0.symbol} / {poolDetails?.pool?.token1.symbol}
      </span>
    </div>
  );

  const renderFavButton = () => (
    <div className="">
      <button
        type="button"
        onClick={handleToggleFavorite}
        className="rounded-full p-2 text-center border-2 border-yellow-500"
      >
        {isFavorite ? (
          <StarIcon className="w-8 text-yellow-500" />
        ) : (
          <StarOutlineIcon className="w-8 text-yellow-500" />
        )}
      </button>
    </div>
  );

  const renderTokenLogo = (token: string) => (
    <span className="flex p-1 border rounded-full border-gray-500">
      <Image
        src={tokenImgSrc(poolDetails?.pool[token].id)}
        alt={""}
        width="18"
        height="18"
      />
    </span>
  );

  const renderBlock = () => (
    <div className="flex p-6 mt-5 bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="flex flex-col mr-6">
        <h5 className="mb-2 text-l font-bold text-gray-900">
          Tokens value (USD)
        </h5>
        {["token0", "token1"].map((token: string) => (
          <div key={token} className="inline-flex py-1">
            {poolDetails?.pool && renderTokenLogo(token)}
            <span className="ml-2">{poolDetails?.pool[token].symbol}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col ml-6">
        <h5 className="mb-2 text-l font-bold text-gray-900">TX Count</h5>
        <span>{poolDetails?.pool?.txCount}</span>
      </div>
    </div>
  );

  return (
    <main className="flex justify-center my-10">
      <div className="container">
        {renderBackButton()}
        {renderTitle()}
        <div className="flex justify-between">
          {renderBlock()}
          {renderFavButton()}
        </div>
      </div>
    </main>
  );
};

export default Pool;
