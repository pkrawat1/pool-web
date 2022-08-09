import type { NextPage } from "next";
import { IPool } from "@/types/pool";

type Props = {
  pools: IPool[];
  legend: string;
  noDataMsg: string;
};

const PoolsList: NextPage<Props> = ({ legend, pools, noDataMsg }) => {
  const renderPagination = () => {
    return <div className=""></div>
  }

  return (
    <div className="max-auto my-3 p-5">
      <legend className="text-2xl pb-3">{legend}</legend>
      <div className="rounded-lg bg-gray-100 p-3 overflow-x-auto relative shadow-md sm:rounded-lg">
        {!pools.length ? (
          <span className="bg-gray-100 p-3">{noDataMsg}</span>
        ) : (
          <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
            <thead>
              <tr>
                <th scope="col" className="py-3 px-6">#</th>
                <th scope="col" className="py-3 px-6">Pool</th>
                <th scope="col" className="py-3 px-6">TX Count</th>
                <th scope="col" className="py-3 px-6">TVL (USD)</th>
                <th scope="col" className="py-3 px-6">Volume (USD)</th>
              </tr>
            </thead>
            <tbody>
              {pools?.map((pool, index) => (
                <tr key={pool.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    {pool.token0.symbol} / {pool.token1.symbol}
                  </td>
                  <td className="py-4 px-6">{pool.txCount}</td>
                  <td className="py-4 px-6">{pool.totalValueLockedUSD}</td>
                  <td className="py-4 px-6">{pool.volumeUSD}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {renderPagination()}
      </div>
    </div>
  );
};

export default PoolsList;
