import * as trpc from "@trpc/server";
import type { Context } from "src/utils/network/createContext";

export function createRouter() {
  return trpc.router<Context>();
}
