import tokenListJson from "./token-list.json";

export * from "./utils";
export const tokenList: {[key: string]: string} = tokenListJson;
