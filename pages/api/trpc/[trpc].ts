import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

import { Context, createContext } from "src/utils/network/createContext";

import { adminUsersTrpc } from "./admin/users";
import { authTrpc } from "./admin/auth";

export const appRouter = trpc
  .router<Context>()
  .merge("admin.auth.", authTrpc)
  .merge("admin.adminUsers.", adminUsersTrpc);

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
