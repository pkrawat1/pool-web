import type { NextPage } from "next";
import { memo } from "react";
import { IPool } from "@/types/";
import { bigNumFormatter } from "@/lib/";
import { useRouter } from "next/router";
import { TokenLogo } from "@/components/";

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
      <td colSpan={2} className="py-4 px-6 text-gray-900 truncate">
        <div className="flex items-center w-full text-left">
          <TokenLogo token={pool.token0} />
          <TokenLogo token={pool.token1} />
          <span className="ml-2">
            {pool.token0.symbol.slice(0, 6)}/{pool.token1.symbol.slice(0, 6)}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 text-center hidden sm:hidden md:table-cell">
        {pool.txCount}
      </td>
      <td className="py-4 px-6 text-center hidden sm:table-cell">
        ${bigNumFormatter(pool.totalValueLockedUSD)}
      </td>
      <td className="py-4 px-6 text-right">
        ${bigNumFormatter(pool.volumeUSD)}
      </td>
    </tr>
  );
};

export default memo(PoolListItem);
