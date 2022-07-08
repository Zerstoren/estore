import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

import { Context, createContext } from "src/utils/network/createContext";

import { admin } from "./admin";

export const appRouter = trpc.router<Context>().merge("admin.", admin);

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
