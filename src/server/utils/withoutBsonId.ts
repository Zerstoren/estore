import { type WithId } from "mongodb";

export const withoutBsonId = <T>(item: WithId<T>, addedBsonFields: Array<keyof WithId<T>> = []) => {
  const replaceFields = ["_id" as const, ...addedBsonFields].map((value) => {
    return [value, item[value]];
  });

  return {
    ...item,
    ...Object.fromEntries(replaceFields),
  };
};
