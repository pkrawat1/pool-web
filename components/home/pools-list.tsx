import type { NextPage } from "next";
import { IPool } from "@/types/";
import { PoolListItem, Loader } from "@/components/";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";

type Props = {
  loading: boolean;
  pools: IPool[];
  legend: string;
  noDataMsg: string;
  currentPage: number;
  totalPages: number;
  updatePage: Function;
};

const PoolsList: NextPage<Props> = ({
  loading,
  legend,
  pools,
  noDataMsg,
  currentPage,
  totalPages,
  updatePage,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const renderTableHeader = () => (
    <thead>
      <tr>
        <th scope="col" colSpan={2} className="py-3 px-6">
          Pool
        </th>
        <th
          scope="col"
          colSpan={1}
          className="py-3 px-6 text-center hidden sm:hidden md:table-cell"
        >
          TX Count
        </th>
        <th
          scope="col"
          colSpan={1}
          className="py-3 px-6 text-center hidden sm:table-cell"
        >
          TVL (USD)
        </th>
        <th scope="col" colSpan={1} className="py-3 px-6 text-right">
          Volume (USD)
        </th>
      </tr>
    </thead>
  );

  const renderBody = () => (
    <tbody>
      {pools?.map((pool) => (
        <PoolListItem key={pool.id} pool={pool} />
      ))}
    </tbody>
  );

  const renderPagination = () => (
    <nav
      className="flex justify-center items-center pt-4 pb-1"
      aria-label="Table navigation"
    >
      {loading && !pools?.length ? (
        <Loader />
      ) : (
        <ul className="inline-flex items-center">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                !isFirstPage && updatePage(currentPage - 1);
              }}
              className="ml-0 text-blue-500 text-xl rounded-l-lg hover:text-blue-700"
            >
              <span className="sr-only">Previous</span>
              <ArrowCircleLeftIcon className="w-8" />
            </a>
          </li>
          <li>
            <span className="text-gray-500 px-5">
              Page {currentPage} of {totalPages}
            </span>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                !isLastPage && updatePage(currentPage + 1);
              }}
              className="ml-0 text-blue-500 text-xl rounded-r-lg hover:text-blue-700"
            >
              <span className="sr-only">Next</span>
              <ArrowCircleRightIcon className="w-8" />
            </a>
          </li>
        </ul>
      )}
    </nav>
  );

  const renderInfoMsg = (msg: string) => <span className="p-3">{msg}</span>;

  return (
    <div className="max-auto my-3 p-5">
      <legend className="text-2xl pb-3">{legend}</legend>
      <div className="rounded-lg bg-gray-100 p-3 overflow-x-auto relative shadow-md sm:rounded-lg">
        {!pools?.length ? (
          !loading && renderInfoMsg(noDataMsg)
        ) : (
          <table className="min-w-full text-md text-left text-gray-500">
            {renderTableHeader()}
            {renderBody()}
          </table>
        )}
        {!!totalPages && renderPagination()}
      </div>
    </div>
  );
};

export default PoolsList;
