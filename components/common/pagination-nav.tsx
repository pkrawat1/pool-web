import type { NextPage } from "next";
import { memo } from "react";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";

type Props = {
  className?: string;
  currentPage: number;
  totalPages: number;
  updatePage: Function;
};

const PaginationNav: NextPage<Props> = ({
  currentPage,
  totalPages,
  updatePage,
  className,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className={className || ""}>
      <ul className="inline-flex items-center">
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              !isFirstPage && updatePage(currentPage - 1);
            }}
            className={`ml-0 text-xl rounded-l-lg ${
              !isFirstPage
                ? "text-blue-500 hover:text-blue-700"
                : "text-blue-300"
            }`}
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
            className={`ml-0 text-xl rounded-l-lg ${
              !isLastPage
                ? "text-blue-500 hover:text-blue-700"
                : "text-blue-300"
            }`}
          >
            <span className="sr-only">Next</span>
            <ArrowCircleRightIcon className="w-8" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default memo(PaginationNav);
