import type { NextPage } from "next";
import { IPool } from "@/types/";
import PoolListItem from "./pool-list-item";

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
        {["Pool", "TX Count", "TVL (USD)", "Volume (USD)"].map((header) => (
          <th key={header} scope="col" className="py-3 px-6">
            {header}
          </th>
        ))}
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
      className="flex justify-center items-center pt-4"
      aria-label="Table navigation"
    >
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              !isFirstPage && updatePage(currentPage - 1);
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
              !isLastPage && updatePage(currentPage + 1);
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

  const renderInfoMsg = (msg: string) => (
    <span className="bg-gray-100 p-3">{msg}</span>
  );

  return (
    <div className="max-auto my-3 p-5">
      <legend className="text-2xl pb-3">{legend}</legend>
      <div className="rounded-lg bg-gray-100 p-3 overflow-x-auto relative shadow-md sm:rounded-lg">
        {!loading ? (
          !pools?.length ? (
            renderInfoMsg(noDataMsg)
          ) : (
            <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
              {renderTableHeader()}
              {renderBody()}
            </table>
          )
        ) : (
          renderInfoMsg("Loading ...")
        )}
        {!!pools?.length && renderPagination()}
      </div>
    </div>
  );
};

export default PoolsList;
