import { NextRouter } from "next/router";

export const createMockRouter = (router: NextRouter): NextRouter => ({
  ...router
});
