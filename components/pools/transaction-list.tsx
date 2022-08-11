import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { IPoolTransaction } from "@/types/";
import { TransactionListItem, Loader } from "@/components/";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

type Props = {
  loading: boolean;
  transaction: IPoolTransaction;
};

const FilterTypes: { [key: string]: string } = {
  All: "All",
  Mints: "Mints",
  Swaps: "Swaps",
  Burns: "Burns",
};

const TransactionList: NextPage<Props> = ({ loading, transaction }) => {
  const allTransactions = useMemo(
    () =>
      loading
        ? []
        : [...transaction?.mints, ...transaction?.burns, ...transaction?.swaps],
    [loading, transaction?.burns, transaction?.mints, transaction?.swaps]
  );

  const [currentType, setCurrentType] = useState(FilterTypes.All);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    if (currentType === FilterTypes.All) {
      return allTransactions;
    }
    const type: "mints" | "burns" | "swaps" = FilterTypes[
      currentType
    ].toLowerCase() as any;
    return transaction[type];
  }, [allTransactions, currentType, transaction]);

  const totalPages = useMemo(
    () => filteredTransactions.length / 10,
    [filteredTransactions.length]
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const renderTableHeader = () => (
    <thead>
      <tr>
        <th scope="col" colSpan={1} className="py-3 px-6">
          Link to Etherscan
        </th>
        <th
          scope="col"
          colSpan={1}
          className="py-3 px-6 text-center hidden sm:hidden md:table-cell"
        >
          TX Type
        </th>
        <th
          scope="col"
          colSpan={1}
          className="py-3 px-6 text-center hidden sm:table-cell"
        >
          Token Amount (USD)
        </th>
        <th scope="col" colSpan={1} className="py-3 px-6 text-right">
          Timestamp
        </th>
      </tr>
    </thead>
  );
  const renderBody = () => (
    <tbody>
      {filteredTransactions
        ?.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10)
        .map((transaction, index) => (
          <TransactionListItem
            key={transaction.transaction.id + index}
            transaction={transaction}
          />
        ))}
    </tbody>
  );

  const updatePage = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => (
    <nav
      className="flex justify-center items-center pt-4 pb-1"
      aria-label="Table navigation"
    >
      {loading ? (
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

  const renderFilters = () => (
    <div className="flex justify-between py-3">
      <div>
        <legend className="text-2xl pb-3 mr-5">Transactions</legend>
      </div>
      <div>

      <Dropdown
        options={Object.keys(FilterTypes)}
        onChange={(val) => {
          setCurrentPage(1);
          setCurrentType(val.value);
        }}
        value={currentType}
        placeholder="Select an option"
      />
      </div>
    </div>
  );
  return (
    <div className="max-auto my-3 py-5">
      {renderFilters()}
      <div className="rounded-lg bg-gray-100 p-3 overflow-x-auto relative shadow-md sm:rounded-lg">
        {!filteredTransactions?.length ? (
          !loading && renderInfoMsg("No transactions found")
        ) : (
          <table className="table-fixed min-w-full text-md text-left text-gray-500 dark:text-gray-400">
            {renderTableHeader()}
            {renderBody()}
          </table>
        )}
        {renderPagination()}
      </div>
    </div>
  );
};

export default TransactionList;
