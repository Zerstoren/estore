import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type LoginArguments } from "pages/api/trpc/admin/auth";

import { trpc } from "src/utils/network/trpc";
import { RequestStatus } from "src/utils/network/requestStatus";
import { LoginForm } from "src/utils/forms/admin/LoginForm";
import { type Store } from "src/admin/store";
import { type AdminUser } from "src/admin/store/user/userAdmins";

const initialState: {
  user: undefined | AdminUser;
  isLogged: boolean;
  requestStatus: RequestStatus;
  validation: Partial<LoginForm>;
} = {
  user: undefined,
  isLogged: false,
  requestStatus: RequestStatus.INIT,
  validation: {},
};

export const loginThunk = createAsyncThunk("admin/auth/login", ({ login, password }: LoginArguments) => {
  return trpc.mutation("admin.auth.login", { login, password });
});

export const logoutThunk = createAsyncThunk("admin/auth/logout", () => {
  return trpc.query("admin.auth.logout");
});

const auth = createSlice({
  name: "admin/auth",
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<AdminUser>) => {
      state.user = action.payload;
      state.isLogged = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.requestStatus = RequestStatus.PENDING;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        if ("error" in payload) {
          state.validation = payload.error.fields;
        } else {
          state.user = payload.user;
          state.isLogged = true;
          state.validation = {};
        }

        state.requestStatus = RequestStatus.FULFILLED;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.requestStatus = RequestStatus.REJECTED;
      });

    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = undefined;
      state.isLogged = false;
    });
  },
});

export const validationSelector = (state: Store) => state.userAuth.validation;
export const getLoggedUserSelector = (state: Store) => state.userAuth.user;
export const isLoggedUserSelector = (state: Store) => state.userAuth.isLogged;
export const { setLoggedUser } = auth.actions;
export const userAuth = auth.reducer;
