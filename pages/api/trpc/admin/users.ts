import { z } from "zod";

import { createRouter } from "src/utils/network/createRouter";
import {
  ServiceAdminUsersAdd,
  ServiceAdminUsersDel,
  ServiceAdminUsersEdit,
  ServiceAdminUsersGet,
  ServiceAdminUsersList,
} from "src/server/service/admin/adminUsers";

const AdminGetUser = z.object({
  _id: z.string(),
});

const AdminDeleteUser = z.object({
  _id: z.string(),
});

const AdminAddEditUser = z.object({
  _id: z.string().optional(),
  record: z.object({
    name: z.string(),
    permission: z.number(),
    password: z.string().optional(),
  }),
});

export type AdminGetUserArguments = z.infer<typeof AdminGetUser>;
export type AdminDeleteUserArguments = z.infer<typeof AdminDeleteUser>;
export type AdminAddEditUserArguments = z.infer<typeof AdminAddEditUser>;

export const adminUsersTrpc = createRouter()
  .query("list", {
    resolve: () => ServiceAdminUsersList(),
  })
  .query("get", {
    input: AdminGetUser,
    resolve: ({ input }) => ServiceAdminUsersGet(input),
  })
  .mutation("add", {
    input: AdminAddEditUser,
    resolve: ({ input }) => ServiceAdminUsersAdd(input),
  })
  .mutation("edit", {
    input: AdminAddEditUser,
    resolve: ({ input }) => ServiceAdminUsersEdit(input),
  })
  .mutation("del", {
    input: AdminDeleteUser,
    resolve: ({ input }) => ServiceAdminUsersDel(input),
  });
