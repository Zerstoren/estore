import { z } from "zod";
import { createRouter } from "src/utils/network/createRouter";
import {
  ServiceAdminCategoryAdd,
  ServiceAdminCategoryChangeParent,
  ServiceAdminCategoryDel,
  ServiceAdminCategoryEdit,
  ServiceAdminCategoryGet,
  ServiceAdminCategoryList,
} from "src/server/service/admin/category";

const CategoriesGet = z.object({
  _id: z.string(),
});

const CategoriesList = z.object({
  search: z.string().optional(),
});

const CategoriesChangeParent = z.object({
  _id: z.string(),
  parent_id: z.union([z.string(), z.null()]),
});

const CategoriesAddEdit = z.object({
  _id: z.string().optional(),
  record: z.object({
    name: z.string(),
    categoryProps: z.array(z.string()),
    url: z.string(),
    title: z.string(),
    keywords: z.string(),
    description: z.string(),
  }),
});

const CategoriesDel = z.object({
  ids: z.array(z.string()),
});

export type CategoriesGetArguments = z.infer<typeof CategoriesGet>;
export type CategoriesListArguments = z.infer<typeof CategoriesList>;
export type CategoriesChangeParentArguments = z.infer<typeof CategoriesChangeParent>;
export type CategoriesAddEditArguments = z.infer<typeof CategoriesAddEdit>;
export type CategoriesDelArguments = z.infer<typeof CategoriesDel>;

export const adminCategoriesTrpc = createRouter()
  .query("get", {
    input: CategoriesGet,
    resolve: ({ input }) => ServiceAdminCategoryGet(input),
  })
  .query("list", {
    input: CategoriesList,
    resolve: ({ input }) => ServiceAdminCategoryList(input),
  })
  .mutation("change_parent", {
    input: CategoriesChangeParent,
    resolve: ({ input }) => ServiceAdminCategoryChangeParent(input),
  })
  .mutation("add", {
    input: CategoriesAddEdit,
    resolve: ({ input }) => ServiceAdminCategoryAdd(input),
  })
  .mutation("edit", {
    input: CategoriesAddEdit,
    resolve: ({ input }) => ServiceAdminCategoryEdit(input),
  })
  .mutation("del", {
    input: CategoriesDel,
    resolve: ({ input }) => ServiceAdminCategoryDel(input),
  });
