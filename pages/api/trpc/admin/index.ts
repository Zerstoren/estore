import { createRouter } from "src/utils/network/createRouter";

import { authTrpc } from "./auth";
import { adminUsersTrpc } from "./adminUsers";
import { adminCategoriesTrpc } from "./categories";
import { adminProductsTrpc } from "./products";
import { adminPropsTrpc } from "./props";
import { adminImagesPullTrpc } from "./imagesPull";

export const admin = createRouter()
  .merge("auth.", authTrpc)
  .merge("adminUsers.", adminUsersTrpc)
  .merge("categories.", adminCategoriesTrpc)
  .merge("products.", adminProductsTrpc)
  .merge("images.", adminImagesPullTrpc)
  .merge("props.", adminPropsTrpc);
