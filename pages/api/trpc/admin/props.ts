import { z } from "zod";
import { createRouter } from "src/utils/network/createRouter";
import {
  ServiceAdminPropsAdd,
  ServiceAdminPropsDel,
  ServiceAdminPropsEdit,
  ServiceAdminPropsGet,
  ServiceAdminPropsList,
} from "src/server/service/admin/props";

const PropsGetParams = z.object({
  _id: z.string(),
});

const PropsListParams = z.object({
  limit: z.number(),
  offset: z.number(),
  search: z.string().optional(),
});

const PropsAddEditParams = z.object({
  _id: z.string().optional(),
  record: z.union([
    z.object({
      name: z.string(),
      contextName: z.string().optional(),
      hidden: z.boolean(),
      type: z.literal("string"),
    }),
    z.object({
      name: z.string(),
      contextName: z.string().optional(),
      hidden: z.boolean(),
      type: z.literal("number"),
    }),
    z.object({
      name: z.string(),
      contextName: z.string().optional(),
      hidden: z.boolean(),
      type: z.literal("boolean"),
    }),
    z.object({
      name: z.string(),
      contextName: z.string().optional(),
      hidden: z.boolean(),
      type: z.literal("tuple"),
      variants: z.array(
        z.object({
          _id: z.string().optional(),
          name: z.string(),
          position: z.number(),
          hidden: z.boolean(),
        }),
      ),
    }),
  ]),
});

const PropsDelParams = z.object({
  ids: z.array(z.string()),
});

export type PropsGetArguments = z.infer<typeof PropsGetParams>;
export type PropsListArguments = z.infer<typeof PropsListParams>;
export type PropsAddEditArguments = z.infer<typeof PropsAddEditParams>;
export type PropsDelArguments = z.infer<typeof PropsDelParams>;

export const adminPropsTrpc = createRouter()
  .query("get", {
    input: PropsGetParams,
    resolve: ({ input }) => ServiceAdminPropsGet(input),
  })
  .query("list", {
    input: PropsListParams,
    resolve: ({ input }) => ServiceAdminPropsList(input),
  })
  .mutation("add", {
    input: PropsAddEditParams,
    resolve: ({ input }) => ServiceAdminPropsAdd(input),
  })
  .mutation("edit", {
    input: PropsAddEditParams,
    resolve: ({ input }) => ServiceAdminPropsEdit(input),
  })
  .mutation("del", {
    input: PropsDelParams,
    resolve: ({ input }) => ServiceAdminPropsDel(input),
  });
