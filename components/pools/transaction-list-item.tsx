import type { NextPage } from "next";
import Moment from "react-moment";
import { IBurn, IMint, ISwap } from "@/types/";
import { bigNumFormatter, transactionLink } from "@/lib/";

type Props = {
  transaction: IMint | IBurn | ISwap;
};

const TransactionListItem: NextPage<Props> = ({ transaction }) => {
  return (
    <tr key={transaction.transaction.id}>
      <td className="py-4 px-6 truncate">
        <a
          className="text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
          href={transactionLink(transaction.transaction.id)}
        >
          Transaction Link
        </a>
      </td>
      <td className="py-4 px-6">{transaction.__typename}</td>
      <td className="py-4 px-6">{bigNumFormatter(transaction.amountUSD)}</td>
      <td className="py-4 px-6">
        <Moment fromNow unix>{transaction.timestamp}</Moment>
      </td>
    </tr>
  );
};

export default TransactionListItem;
