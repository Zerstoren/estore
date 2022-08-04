import type { ObjectId } from "mongodb";

export type RecursiveTransformObjectIdToString<O> = O extends ObjectId
  ? string
  : O extends object
  ? {
      [K in keyof O]: RecursiveTransformObjectIdToString<O[K]>;
    }
  : O extends Array<infer E>
  ? RecursiveTransformObjectIdToString<E>
  : O;
