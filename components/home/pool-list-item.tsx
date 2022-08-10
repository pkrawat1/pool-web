import type { NextPage } from "next";
import { IPool } from "@/types/";
import { bigNumFormatter } from "@/lib/";
import { useRouter } from "next/router";

type Props = {
  pool: IPool;
};

const PoolListItem: NextPage<Props> = ({ pool }) => {
  const router = useRouter();
  return (
    <tr
      key={pool.id}
      className="bg-white cursor-pointer border-b hover:bg-gray-50"
      onClick={() => router.push(`/pools/${pool.id}`)}
    >
      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap truncate">
        {pool.token0.symbol} / {pool.token1.symbol}
      </td>
      <td className="py-4 px-6">{pool.txCount}</td>
      <td className="py-4 px-6">
        ${bigNumFormatter(pool.totalValueLockedUSD)}
      </td>
      <td className="py-4 px-6">${bigNumFormatter(pool.volumeUSD)}</td>
    </tr>
  );
};

export default PoolListItem;
