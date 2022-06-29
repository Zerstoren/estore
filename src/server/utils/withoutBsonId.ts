import { type WithId } from "mongodb";

export const withoutBsonId = <T>(item: WithId<T>) => {
  return {
    ...item,
    _id: item._id.toString(),
  };
};
