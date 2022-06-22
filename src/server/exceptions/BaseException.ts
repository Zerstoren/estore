import { TRPCError } from "@trpc/server";

export class BaseException extends Error {
  constructor(message = "BASE_EXCEPTION") {
    super(message);
  }
}
