export const FilterTypes: { [key: string]: string } = {
  All: "All",
  Mints: "mints",
  Swaps: "swaps",
  Burns: "burns",
};


export const MAX_POOL = 100;
export const MAX_TABLE_SIZE = 10;
export const MAX_POOL_PAGE = MAX_POOL / MAX_TABLE_SIZE;

export const API_ERROR_MSG = "Network error occurred";
export type TransactionType = "mints" | "burns" | "swaps"