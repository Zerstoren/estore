import { configureStore } from "@reduxjs/toolkit";

import { userAdmins } from "./user/admin";
import { userAuth } from "./user/auth";

export const store = configureStore({
  reducer: {
    userAuth,
    userAdmins,
  },
});

export type AppDispatch = typeof store.dispatch;
export type Store = ReturnType<typeof store.getState>;
