import type { ObjectId } from "mongodb";

export type AdminUsersSchema = {
  name: string;
  permission: number;
  password: string;
};

export type CategoriesSchema = {
  name: string;
  url: string;
  title: string;
  keywords: string;
  description: string;
  parent_id: ObjectId | null;
};

export type ProductsSchema = {
  name: string;
  url: string;

  image_pull: ObjectId;
  category_id: ObjectId;
  specifications: Array<[string, Array<ObjectId>]>;
  stock: {
    quantity: number;
    price: number;
  };

  title: string;
  keywords: string;
  description: string;
};

export type ImagesSchema = {
  pull_id: ObjectId;
  src: string;
};

export type PropsSchema = {
  name: string;
  contextName?: string;
  hidden: boolean;
} & (
  | {
      type: "string" | "number" | "boolean";
      variants: undefined;
    }
  | {
      type: "tuple";
      variants:
        | Array<{
            name: string;
            position: number;
            hidden: boolean;
            _id: ObjectId;
          }>
        | undefined;
    }
);

export type DbSchema = {
  adminUsers: AdminUsersSchema;
  categories: CategoriesSchema;
  products: ProductsSchema;
  images: ImagesSchema;
  props: PropsSchema;
};
