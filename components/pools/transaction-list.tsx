import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { FilterTypes, IPoolTransaction, TransactionType } from "@/types/";
import { TransactionListItem, Loader, PaginationNav } from "@/components/";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

type Props = {
  loading: boolean;
  transaction: IPoolTransaction;
};

const TransactionList: NextPage<Props> = ({ loading, transaction }) => {
  const allTransactions = useMemo(
    () =>
      loading
        ? []
        : [
            ...transaction?.mints,
            ...transaction?.burns,
            ...transaction?.swaps,
          ].sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp)),
    [loading, transaction?.burns, transaction?.mints, transaction?.swaps]
  );

  const [currentType, setCurrentType] = useState(FilterTypes.All);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    if (currentType === FilterTypes.All) {
      return allTransactions;
    }
    const type: TransactionType = FilterTypes[
      currentType
    ].toLowerCase() as any;
    return transaction[type];
  }, [allTransactions, currentType, transaction]);

  const totalPages = useMemo(
    () => Math.ceil(filteredTransactions?.length / 10),
    [filteredTransactions?.length]
  );

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
      className="flex justify-center items-center"
      aria-label="Table navigation"
    >
      {loading ? (
        <Loader />
      ) : (
        !!totalPages && (
          <PaginationNav
            className="pt-4"
            currentPage={currentPage}
            totalPages={totalPages}
            updatePage={updatePage}
          />
        )
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
          <table className="table-fixed min-w-full text-md text-left text-gray-500 text-sm md:text-base">
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
