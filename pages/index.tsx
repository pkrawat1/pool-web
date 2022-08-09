import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { PoolsList } from "./../components";
import { GET_POOLS_LIST } from "./../gql";
import { useQuery } from "@apollo/client";
import { IPool } from "@/types/";

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(GET_POOLS_LIST);
  const [favoritePoolIds, setFavoritePoolIds] = useState([]);

  useEffect(() => {
    let storage = localStorage.getItem("favoritePools");
    if (storage) {
      setFavoritePoolIds(JSON.parse(storage));
    }
  }, []);

  const favoritePools = useMemo(() => {
    return data?.pools.filter((pool: IPool) =>
      favoritePoolIds.includes(pool.id as never)
    );
  }, [data?.pools, favoritePoolIds]);

  return (
    <main>
      <PoolsList pools={favoritePools} legend={"Pool Watch list"} noDataMsg={"Saved pools here"} />
      <PoolsList pools={data?.pools} legend={"All Pools"} noDataMsg={"All pools here"} />
    </main>
  );
};

export default Home;
