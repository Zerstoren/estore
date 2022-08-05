import { ObjectId } from "mongodb";

import { getCollection } from "src/server/utils/mongodb";
import type {
  CategoriesAddEditArguments,
  CategoriesChangeParentArguments,
  CategoriesDelArguments,
  CategoriesGetArguments,
} from "pages/api/trpc/admin/categories";
import { withoutBsonId } from "src/server/utils/withoutBsonId";

export const ServiceAdminCategoryList = async () => {
  const collection = await getCollection("categories");
  return collection
    .find({})
    .map((category) => withoutBsonId(category, ["parent_id"]))
    .toArray();
};

export const ServiceAdminCategoryGet = async ({ _id }: CategoriesGetArguments) => {
  const collection = await getCollection("categories");
  const propsCollection = await getCollection("props");

  const category = await collection.findOne({ _id: new ObjectId(_id) });

  if (category) {
    const categoryProps = await propsCollection
      .find({ _id: { $in: category.categoryProps } })
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .map(({ _id, name, contextName }) => ({
        value: _id.toString(),
        label: `${name} (${contextName})`,
      }))
      .toArray();

    return { ...withoutBsonId(category, ["parent_id"]), categoryProps };
  }

  return category;
};

export const ServiceAdminCategoryChangeParent = async ({ parent_id, _id }: CategoriesChangeParentArguments) => {
  const collection = await getCollection("categories");
  await collection.updateOne(
    { _id: new ObjectId(_id) },
    {
      $set: {
        parent_id: parent_id ? new ObjectId(parent_id) : null,
      },
    },
  );
  return "ok";
};

export const ServiceAdminCategoryAdd = async ({ record }: CategoriesAddEditArguments) => {
  const collection = await getCollection("categories");
  await collection.insertOne({
    ...record,
    categoryProps: record.categoryProps.map((_id) => new ObjectId(_id)),
    parent_id: null,
  });
  return "ok";
};

export const ServiceAdminCategoryEdit = async ({ _id, record }: CategoriesAddEditArguments) => {
  const collection = await getCollection("categories");
  await collection.updateOne(
    { _id: new ObjectId(_id) },
    {
      $set: {
        ...record,
        categoryProps: record.categoryProps.map((_id) => new ObjectId(_id)),
      },
    },
  );
  return "ok";
};

export const ServiceAdminCategoryDel = async ({ ids }: CategoriesDelArguments) => {
  const collection = await getCollection("categories");
  await collection.deleteMany({ _id: { $in: ids.map((id) => new ObjectId(id)) } });
};
