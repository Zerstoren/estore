import { ObjectId } from "mongodb";

import { getCollection } from "src/server/utils/mongodb";
import { withoutBsonId } from "src/server/utils/withoutBsonId";
import type {
  ProductsAddEditArguments,
  ProductsGetArguments,
  ProductsListArguments,
  ProductsDelArguments,
} from "pages/api/trpc/admin/products";

export const ServiceAdminProductGet = async ({ _id }: ProductsGetArguments) => {
  const collection = await getCollection("products");
  const product = await collection.findOne({ _id: new ObjectId(_id) });

  if (product) {
    return withoutBsonId(product);
  }

  return product;
};

export const ServiceAdminProductList = async ({ offset, limit }: ProductsListArguments) => {
  const collection = await getCollection("products");
  return collection
    .find()
    .skip(offset)
    .limit(limit)
    .map((product) => withoutBsonId(product, ["category_id", "image_pull", "stock"]))
    .toArray();
};

export const ServiceAdminProductAdd = async ({ record }: ProductsAddEditArguments) => {
  const collection = await getCollection("products");
  await collection.insertOne({
    ...record,
    category_id: new ObjectId(record.category_id),
    image_pull: new ObjectId(record.image_pull),
    stock: new ObjectId(record.stock),
    specifications: [],
  });
  return "ok";
};

export const ServiceAdminProductEdit = async ({ _id, record }: ProductsAddEditArguments) => {
  const collection = await getCollection("products");
  await collection.updateOne(
    { _id: new ObjectId(_id) },
    {
      $set: {
        ...record,
        category_id: new ObjectId(record.category_id),
        image_pull: new ObjectId(record.image_pull),
        stock: new ObjectId(record.stock),
        specifications: [],
      },
    },
  );
  return "ok";
};

export const ServiceAdminProductDel = async ({ ids }: ProductsDelArguments) => {
  const collection = await getCollection("products");
  await collection.deleteMany({ _id: { $in: ids.map((id) => new ObjectId(id)) } });
  return "ok";
};
