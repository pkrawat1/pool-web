import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { PoolsList } from "./../components";
import { GET_POOLS_LIST, GET_SAVED_POOLS_LIST } from "./../gql";
import { useQuery } from "@apollo/client";

const MAX_POOL = 100;
const MAX_TABLE_SIZE = 10;
const MAX_POOL_PAGE = MAX_POOL / MAX_TABLE_SIZE;

const Home: NextPage = () => {
  const { data: allPoolsData, refetch: fetchNextPoolPage } = useQuery(
    GET_POOLS_LIST,
    {
      variables: { offset: 0, limit: MAX_TABLE_SIZE },
    }
  );

  const [favoritePoolIds, setFavoritePoolIds] = useState([]);
  const { data: favoritePoolsData, refetch: fetchNextFavoritePoolPage } =
    useQuery(GET_SAVED_POOLS_LIST, {
      variables: { ids: favoritePoolIds, offset: 0, limit: MAX_TABLE_SIZE },
    });

  const [currentPoolPage, setCurrentPoolPage] = useState(1);

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

  return (
    <main>
      <PoolsList
        pools={favoritePoolsData?.pools}
        legend={"Pool Watch list"}
        noDataMsg={"Saved pools here"}
        currentPage={1}
        totalPages={1}
        updatePage={handleUpdatePageAllPools}
      />
      <PoolsList
        pools={allPoolsData?.pools}
        legend={"All Pools"}
        noDataMsg={"All pools here"}
        currentPage={currentPoolPage}
        totalPages={10}
        updatePage={handleUpdatePageAllPools}
      />
    </main>
  );
};

export default Home;
