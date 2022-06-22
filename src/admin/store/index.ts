import { configureStore } from "@reduxjs/toolkit";

import { userAdmin } from "./user/auth";

export const store = configureStore({
  reducer: {
    userAdmin,
  },
});

export type AppDispatch = typeof store.dispatch;
export type Store = ReturnType<typeof store.getState>;
