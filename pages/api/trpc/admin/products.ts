import { z } from "zod";

import { createRouter } from "src/utils/network/createRouter";
import {
  ServiceAdminProductAdd,
  ServiceAdminProductDel,
  ServiceAdminProductEdit,
  ServiceAdminProductGet,
  ServiceAdminProductList,
} from "src/server/service/admin/products";

const ProductsGetParams = z.object({
  _id: z.string(),
});

const ProductsListParams = z.object({
  limit: z.number(),
  offset: z.number(),
});

const ProductsAddEditParams = z.object({
  _id: z.string().optional(),
  record: z.object({
    name: z.string(),
    url: z.string(),
    sku: z.string(),
    price: z.number(),
    image_pull: z.string(),

    category_id: z.string(),
    props: z.record(z.string(), z.union([z.string(), z.boolean(), z.record(z.string(), z.boolean())])),

    title: z.string(),
    keywords: z.string(),
    description: z.string(),
  }),
});

const ProductsDelParams = z.object({
  ids: z.array(z.string()),
});

export type ProductsGetArguments = z.infer<typeof ProductsGetParams>;
export type ProductsListArguments = z.infer<typeof ProductsListParams>;
export type ProductsAddEditArguments = z.infer<typeof ProductsAddEditParams>;
export type ProductsDelArguments = z.infer<typeof ProductsDelParams>;

export const adminProductsTrpc = createRouter()
  .query("get", {
    input: ProductsGetParams,
    resolve: ({ input }) => ServiceAdminProductGet(input),
  })
  .query("list", {
    input: ProductsListParams,
    resolve: ({ input }) => ServiceAdminProductList(input),
  })
  .mutation("add", {
    input: ProductsAddEditParams,
    resolve: ({ input }) => ServiceAdminProductAdd(input),
  })
  .mutation("edit", {
    input: ProductsAddEditParams,
    resolve: ({ input }) => ServiceAdminProductEdit(input),
  })
  .mutation("del", {
    input: ProductsDelParams,
    resolve: ({ input }) => ServiceAdminProductDel(input),
  });
