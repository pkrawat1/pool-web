import tokenListJson from "./token-list.json";

export * from "./apollo-client";
export * from "./utils";
export const tokenList: { [key: string]: string } = tokenListJson;
