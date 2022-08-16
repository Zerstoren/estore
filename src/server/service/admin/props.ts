import { ObjectId } from "mongodb";

import type {
  PropsAddEditArguments,
  PropsGetArguments,
  PropsListArguments,
  PropsDelArguments,
  PropsByCategoryArguments,
} from "pages/api/trpc/admin/props";
import { getCollection } from "src/server/utils/mongodb";
import { withoutBsonId } from "src/server/utils/withoutBsonId";

export const ServiceAdminPropsGet = async ({ _id }: PropsGetArguments) => {
  const collection = await getCollection("props");
  const prop = await collection.findOne({ _id: new ObjectId(_id) });

  if (prop) {
    return withoutBsonId(prop);
  }

  return prop;
};

export const ServiceAdminPropsList = async ({ offset, limit, search }: PropsListArguments) => {
  const collection = await getCollection("props");
  const total = await collection.countDocuments(
    search
      ? {
          $text: { $search: search },
        }
      : {},
  );

  const items = await collection
    .find(
      search
        ? {
            $text: { $search: search },
          }
        : {},
    )
    .skip(offset)
    .limit(limit)
    .map((prop) => withoutBsonId(prop))
    .toArray();

  return {
    items,
    offset,
    limit,
    total,
    search: search || "",
  };
};

export const ServiceAdminPropsByCategory = async ({ _id }: PropsByCategoryArguments) => {
  const categoriesCollection = await getCollection("categories");
  const collection = await getCollection("props");
  const category = await categoriesCollection.findOne({ _id: new ObjectId(_id) });

  if (!category) {
    return null;
  }

  return collection
    .find({ _id: { $in: category.categoryProps } })
    .map((prop) => withoutBsonId(prop))
    .toArray();
};

export const ServiceAdminPropsAdd = async ({ record }: PropsAddEditArguments) => {
  const collection = await getCollection("props");

  if (record.type === "tuple") {
    await collection.insertOne({
      ...record,
      variants: record.variants.map((variant) => ({ ...variant, _id: new ObjectId() })),
    });
    return "ok";
  }

  await collection.insertOne({ ...record, variants: undefined });
  return "ok";
};

export const ServiceAdminPropsEdit = async ({ _id, record }: PropsAddEditArguments) => {
  const collection = await getCollection("props");
  if (record.type === "tuple") {
    await collection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...record,
          variants: record.variants.map((variant) => ({ ...variant, _id: new ObjectId(variant._id) })),
        },
      },
    );
    return "ok";
  }

  await collection.updateOne({ _id: new ObjectId(_id) }, { $set: { ...record, variants: undefined } });
  return "ok";
};

export const ServiceAdminPropsDel = async ({ ids }: PropsDelArguments) => {
  const collection = await getCollection("props");
  await collection.deleteMany({ _id: { $in: ids.map((id) => new ObjectId(id)) } });
  return "ok";
};
