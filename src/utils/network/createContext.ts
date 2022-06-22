import type { CreateNextContextOptions } from "@trpc/server/dist/declarations/src/adapters/next";
import type { inferAsyncReturnType } from "@trpc/server";

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  return {
    req,
    res,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
