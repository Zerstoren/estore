import { ObjectId } from "mongodb";
import passwordHash from "password-hash";

import { type GetLoggedUserArguments, type LoginArguments } from "pages/api/trpc/admin/auth";

import { getCollection } from "src/server/utils/mongodb";
import { ValidationError } from "src/server/errors/ValidationError";
import { LoginForm } from "src/utils/forms/admin/LoginForm";
import type { Context } from "src/utils/network/createContext";
import { parseCookie } from "src/utils/network/parseCookie";
import { withoutBsonId } from "src/server/utils/withoutBsonId";

export const ServiceAdminAuthLogin = async (ctx: Context, { login, password }: LoginArguments) => {
  const adminUsers = await getCollection("admin");
  const user = await adminUsers.findOne({ name: login });

  if (!user || passwordHash.verify(password, user.password)) {
    return ValidationError<LoginForm>({
      login: "User or password is wrong",
      password: "User or password is wrong",
    });
  }

  ctx.res.setHeader("Set-Cookie", `auth=${user._id.toString()}; Path=/; HttpOnly;`);

  return {
    user: withoutBsonId(user),
  };
};

export const ServiceAdminAuthLogout = async (ctx: Context) => {
  ctx.res.setHeader("Set-Cookie", "auth=deleted; Path=/; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT;");
  return true;
};

export const ServiceAdminAuthGetLoggedUser = async (ctx: Context, input: GetLoggedUserArguments) => {
  const cookies = parseCookie(ctx.req.headers.cookie || "");
  const authKey = cookies.auth || input.secretKey;

  if (authKey) {
    const adminUsers = await getCollection("admin");
    return adminUsers.findOne({ _id: new ObjectId(authKey) });
  }

  return null;
};
