import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { PoolsList } from "@/components/";
import { GET_POOLS_LIST, GET_SAVED_POOLS_LIST } from "@/gql/";
import { NetworkStatus, useQuery } from "@apollo/client";
import { MAX_POOL, MAX_POOL_PAGE, MAX_TABLE_SIZE } from "@/types/";

const Home: NextPage = () => {
  const {
    loading: allPoolsDataLoading,
    networkStatus: allPoolRefetch,
    data: allPoolsData,
    refetch: fetchNextPoolPage,
  } = useQuery(GET_POOLS_LIST, {
    variables: { offset: 0, limit: MAX_TABLE_SIZE },
    notifyOnNetworkStatusChange: true,
  });

  const [favoritePoolIds, setFavoritePoolIds] = useState([]);
  const {
    loading: favoritePoolsDataLoading,
    data: favoritePoolsData,
    networkStatus: favoritePoolRefetch,
    refetch: fetchNextFavoritePoolPage,
  } = useQuery(GET_SAVED_POOLS_LIST, {
    variables: { ids: favoritePoolIds, offset: 0, limit: MAX_TABLE_SIZE },
  });

  const [currentPoolPage, setCurrentPoolPage] = useState(1);
  const [currentFavPoolPage, setCurrentFavPoolPage] = useState(1);

  useEffect(() => {
    let storage = localStorage.getItem("favoritePools");
    if (storage) {
      const favIDs = JSON.parse(storage);
      setFavoritePoolIds(favIDs);
    }
  }, []);

  useEffect(() => {
    fetchNextFavoritePoolPage({
      ids: favoritePoolIds,
      offset: 0,
      limit: MAX_TABLE_SIZE,
    });
  }, [favoritePoolIds, fetchNextFavoritePoolPage]);

  const handleUpdatePageAllPools = (nextPage: number) => {
    if (nextPage <= MAX_POOL_PAGE && nextPage >= 1) {
      setCurrentPoolPage(nextPage);
      fetchNextPoolPage({
        offset: (nextPage - 1) * MAX_TABLE_SIZE,
        limit: MAX_TABLE_SIZE,
      });
    }
  };
  const handleUpdatePageFavoritePools = (nextPage: number) => {
    if (nextPage <= MAX_POOL_PAGE && nextPage >= 1) {
      setCurrentFavPoolPage(nextPage);
      fetchNextFavoritePoolPage({
        offset: (nextPage - 1) * MAX_TABLE_SIZE,
        limit: MAX_TABLE_SIZE,
      });
    }
  };

  return (
    <main className="flex">
      <div className="container mx-auto max-w-5xl text-sm md:text-base">
        <PoolsList
          loading={
            favoritePoolsDataLoading ||
            NetworkStatus.refetch === favoritePoolRefetch
          }
          pools={favoritePoolsData?.pools}
          legend={"Pool Watch list"}
          noDataMsg={"Saved pools here"}
          currentPage={currentFavPoolPage}
          totalPages={Math.ceil(favoritePoolIds.length / MAX_TABLE_SIZE )}
          updatePage={handleUpdatePageFavoritePools}
        />
        <PoolsList
          loading={
            allPoolsDataLoading || NetworkStatus.refetch === allPoolRefetch
          }
          pools={allPoolsData?.pools}
          legend={"All Pools"}
          noDataMsg={"All pools here"}
          currentPage={currentPoolPage}
          totalPages={Math.ceil(MAX_POOL / MAX_TABLE_SIZE)}
          updatePage={handleUpdatePageAllPools}
        />
      </div>
    </main>
  );
};

export default Home;
