import type { NextPage } from "next";
import { IPool } from "@/types/pool";
import { bigNumFormatter } from "@/lib/";
import { MouseEventHandler } from "react";

type Props = {
  pools: IPool[];
  legend: string;
  noDataMsg: string;
  currentPage: number;
  totalPages: number;
  updatePage: Function;
};

const PoolsList: NextPage<Props> = ({
  legend,
  pools,
  noDataMsg,
  currentPage,
  totalPages,
  updatePage,
}) => {
  const renderPagination = () => {
    return (
      <nav
        className="flex justify-center items-center pt-4"
        aria-label="Table navigation"
      >
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                updatePage(currentPage - 1);
              }}
              className="py-2 px-3 ml-0 text-blue-500 text-xl rounded-l-lg hover:text-blue-700"
            >
              <span className="sr-only">Previous</span>
              {"<--"}
            </a>
          </li>
          <li>
            <span className="text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                updatePage(currentPage + 1);
              }}
              className="py-2 px-3 ml-0 text-blue-500 text-xl rounded-r-lg hover:text-blue-700"
            >
              <span className="sr-only">Next</span>
              {"-->"}
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="max-auto my-3 p-5">
      <legend className="text-2xl pb-3">{legend}</legend>
      <div className="rounded-lg bg-gray-100 p-3 overflow-x-auto relative shadow-md sm:rounded-lg">
        {!pools?.length ? (
          <span className="bg-gray-100 p-3">{noDataMsg}</span>
        ) : (
          <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
            <thead>
              <tr>
                <th scope="col" className="py-3 px-6">
                  Pool
                </th>
                <th scope="col" className="py-3 px-6">
                  TX Count
                </th>
                <th scope="col" className="py-3 px-6">
                  TVL (USD)
                </th>
                <th scope="col" className="py-3 px-6">
                  Volume (USD)
                </th>
              </tr>
            </thead>
            <tbody>
              {pools?.map((pool, index) => (
                <tr
                  key={pool.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    {pool.token0.symbol} / {pool.token1.symbol}
                  </td>
                  <td className="py-4 px-6">{pool.txCount}</td>
                  <td className="py-4 px-6">
                    ${bigNumFormatter(pool.totalValueLockedUSD)}
                  </td>
                  <td className="py-4 px-6">
                    ${bigNumFormatter(pool.volumeUSD)}
                  </td>
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
