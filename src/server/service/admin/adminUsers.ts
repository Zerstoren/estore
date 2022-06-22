import { ObjectId } from "mongodb";

import {
  type AdminAddEditUserArguments,
  type AdminDeleteUserArguments,
  type AdminGetUserArguments,
} from "pages/api/trpc/admin/users";
import { getCollection } from "src/server/utils/mongodb";

export const ServiceAdminUsersList = async () => {
  const collection = await getCollection("admin");
  return collection.find({}).toArray();
};

export const ServiceAdminUsersGet = async ({ _id }: AdminGetUserArguments) => {
  const collection = await getCollection("admin");
  return collection.findOne({ _id: new ObjectId(_id) });
};

export const ServiceAdminUsersAdd = async ({ record }: AdminAddEditUserArguments) => {
  const collection = await getCollection("admin");
  await collection.insertOne(record);
  return "ok";
};

export const ServiceAdminUsersEdit = async ({ _id, record }: AdminAddEditUserArguments) => {
  const collection = await getCollection("admin");
  await collection.updateOne({ _id: new ObjectId(_id) }, record);
  return "ok";
};

export const ServiceAdminUsersDel = async ({ _id }: AdminDeleteUserArguments) => {
  const collection = await getCollection("admin");
  await collection.deleteOne({ _id: new ObjectId(_id) });
  return true;
};
