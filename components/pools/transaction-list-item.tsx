import type { NextPage } from "next";
import { memo } from 'react';
import Moment from "react-moment";
import { IBurn, IMint, ISwap } from "@/types/";
import { bigNumFormatter, transactionLink } from "@/lib/";

type Props = {
  transaction: IMint | IBurn | ISwap;
};

const TransactionListItem: NextPage<Props> = ({ transaction }) => {
  return (
    <tr key={transaction.transaction.id} className="bg-white border-b hover:bg-gray-50">
      <td className="py-3 px-6">
        <a
          className="text-blue-500 text-left"
          target="_blank"
          rel="noopener noreferrer"
          href={transactionLink(transaction.transaction.id)}
        >
          {transaction.transaction.id.slice(0, 15)}...
        </a>
      </td>
      <td className="px-6 text-center hidden sm:hidden md:table-cell">{transaction.__typename}</td>
      <td className="px-6 text-center hidden sm:table-cell">{bigNumFormatter(transaction.amountUSD)}</td>
      <td className="px-6 text-right">
        <Moment fromNow unix>
          {transaction.timestamp}
        </Moment>
      </td>
    </tr>
  );
};

export default memo(TransactionListItem);
