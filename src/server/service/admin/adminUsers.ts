import { ObjectId } from "mongodb";
import password from "password-hash";

import {
  type AdminAddEditUserArguments,
  type AdminDeleteUserArguments,
  type AdminGetUserArguments,
} from "pages/api/trpc/admin/users";
import { getCollection } from "src/server/utils/mongodb";
import { withoutBsonId } from "src/server/utils/withoutBsonId";

export const ServiceAdminUsersList = async () => {
  const collection = await getCollection("admin");
  return collection.find({}).map(withoutBsonId).toArray();
};

export const ServiceAdminUsersGet = async ({ _id }: AdminGetUserArguments) => {
  const collection = await getCollection("admin");
  const user = await collection.findOne({ _id: new ObjectId(_id) });

  if (user) {
    return withoutBsonId(user);
  }

  return user;
};

export const ServiceAdminUsersAdd = async ({ record }: AdminAddEditUserArguments) => {
  if (!record.password) {
    return "fail";
  }

  const collection = await getCollection("admin");
  await collection.insertOne({
    name: record.name,
    password: password.generate(record.password),
    permission: record.permission,
  });
  return "ok";
};

export const ServiceAdminUsersEdit = async ({ _id, record }: AdminAddEditUserArguments) => {
  const collection = await getCollection("admin");
  await collection.updateOne(
    { _id: new ObjectId(_id) },
    {
      $set: {
        name: record.name,
        permission: record.permission,
        password: record.password ? password.generate(record.password) : undefined,
      },
    },
  );
  return "ok";
};

export const ServiceAdminUsersDel = async ({ _id }: AdminDeleteUserArguments) => {
  const collection = await getCollection("admin");
  await collection.deleteOne({ _id: new ObjectId(_id) });
  return true;
};
