import { z } from "zod";

import { createRouter } from "src/utils/network/createRouter";
import {
  ServiceAdminAuthGetLoggedUser,
  ServiceAdminAuthLogin,
  ServiceAdminAuthLogout,
} from "src/server/service/admin/auth";

const LoginUserData = z.object({
  login: z.string(),
  password: z.string(),
});

const getLoggedUserData = z.object({
  secretKey: z.string().optional(),
});

export type LoginArguments = z.infer<typeof LoginUserData>;
export type GetLoggedUserArguments = z.infer<typeof getLoggedUserData>;

export const authTrpc = createRouter()
  .mutation("login", {
    input: LoginUserData,
    resolve: ({ ctx, input }) => ServiceAdminAuthLogin(ctx, input),
  })
  .query("logout", {
    resolve: ({ ctx }) => ServiceAdminAuthLogout(ctx),
  })
  .query("getLoggedUser", {
    input: getLoggedUserData,
    resolve: ({ ctx, input }) => ServiceAdminAuthGetLoggedUser(ctx, input),
  });
