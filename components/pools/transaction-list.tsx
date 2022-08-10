import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { IPoolTransaction } from "@/types/";
import { TransactionListItem, Loader } from "@/components/";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";

type Props = {
  transaction: IPoolTransaction;
};

const FilterTypes = {
  ALL: "all",
  Mints: "mints",
  Swaps: "swaps",
  Burns: "burns",
};

const TransactionList: NextPage<Props> = ({ transaction }) => {
  const allTransactions = useMemo(
    () => [...transaction.mints, ...transaction.burns, ...transaction.swaps],
    [transaction.burns, transaction.mints, transaction.swaps]
  );
  const [currentType, setCurrentType] = useState(FilterTypes.ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(() => {
    if (currentType === FilterTypes.ALL) {
      return allTransactions.length / 10;
    }
    // TODO : temp change
    return (transaction as any)[currentType].length / 10;
  }, [allTransactions.length, currentType, transaction]);
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
      {allTransactions
        ?.slice(currentPage * 10, currentPage * 10 + 10)
        .map((transaction) => (
          <TransactionListItem
            key={transaction.transaction.id}
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
    </nav>
  );

  const renderInfoMsg = (msg: string) => <span className="p-3">{msg}</span>;

  return (
    <div className="max-auto my-3 p-5">
      <legend className="text-2xl pb-3">Transactions</legend>
      <div className="rounded-lg bg-gray-100 p-3 overflow-x-auto relative shadow-md sm:rounded-lg">
        {!allTransactions?.length ? (
          renderInfoMsg("No transactions found")
        ) : (
          <table className="table-fixed min-w-full text-md text-left text-gray-500 dark:text-gray-400">
            {renderTableHeader()}
            {renderBody()}
          </table>
        )}
        {!!totalPages && renderPagination()}
      </div>
    </div>
  );
};

export default TransactionList;
