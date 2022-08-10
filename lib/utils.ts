import BigNumber from "bignumber.js";

export const bigNumFormatter = (num: string): string => {
  let bigNum = BigNumber(num);
  if (bigNum.isGreaterThan(999) && bigNum.isLessThan(1000000)) {
    return bigNum.dividedBy(1000).toFixed(2) + "k"; // convert to K for number from > 1000 < 1 million
  } else if (bigNum.isGreaterThan(1000000)) {
    return bigNum.dividedBy(1000000).toFixed(2) + "m"; // convert to M for number from > 1 million
  } else {
    return bigNum.toFixed(2).toString(); // if value < 1000, nothing to do
  }
};

export const tokenImgSrc = (id: string) => {
  return `https://raw.githubusercontent.com/trustwallet/assets/old/blockchains/ethereum/assets/${id}/logo.png`;
};

export const transactionLink = (id: string) => {
  return `https://etherscan.io/tx/${id}`;
};
