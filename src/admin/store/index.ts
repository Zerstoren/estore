import { configureStore } from "@reduxjs/toolkit";

import { userAdmins } from "./user/userAdmins";
import { userAuth } from "./user/auth";
import { props } from "./products/props";
import { categories } from "./products/categories";
import { products } from "./products/products";

export const store = configureStore({
  reducer: {
    userAuth,
    userAdmins,
    products,
    categories,
    props,
  },
});

export type AppDispatch = typeof store.dispatch;
export type Store = ReturnType<typeof store.getState>;
