import type { NextPage } from "next";
import { IPool } from "@/types/";
import { PoolListItem, Loader, PaginationNav } from "@/components/";

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
      className="flex justify-center items-center"
      aria-label="Table navigation"
    >
      {loading && !pools?.length ? (
        <Loader />
      ) : (
        <PaginationNav
          className="pt-4"
          currentPage={currentPage}
          totalPages={totalPages}
          updatePage={updatePage}
        />
      )}
    </nav>
  );

  const renderInfoMsg = (msg: string) => (
    <span className="p-3 no-data-msg">{msg}</span>
  );

  return (
    <div className="max-auto my-3 p-5">
      <legend className="text-2xl pb-3">{legend}</legend>
      <div className="rounded-lg bg-gray-100 p-3 overflow-x-auto relative shadow-md sm:rounded-lg">
        {!pools?.length ? (
          !loading && renderInfoMsg(noDataMsg)
        ) : (
          <table className="table-fixed min-w-full text-md text-left text-gray-500  text-sm md:text-base">
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
