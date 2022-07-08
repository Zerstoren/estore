import { createRouter } from "src/utils/network/createRouter";

import { authTrpc } from "./auth";
import { adminUsersTrpc } from "./adminUsers";
import { adminCategoriesTrpc } from "./categories";

export const admin = createRouter()
  .merge("auth.", authTrpc)
  .merge("adminUsers.", adminUsersTrpc)
  .merge("categories.", adminCategoriesTrpc);
