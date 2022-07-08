import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { trpc } from "src/utils/network/trpc";
import { AdminAddEditUserArguments } from "pages/api/trpc/admin/adminUsers";
import { RequestStatus } from "src/utils/network/requestStatus";
import type { Store } from "src/admin/store";
import { type AdminUsersSchema } from "src/server/utils/dbSchema";

export type AdminUser = {
  _id: string;
} & AdminUsersSchema;

const initialState: {
  listUsers: Array<AdminUser>;
  listRequestStatus: RequestStatus;

  oneUser: null | AdminUser;
  oneUserRequestStatus: RequestStatus;

  addValidation: Partial<AdminAddEditUserArguments["record"]>;
  addRequestStatus: RequestStatus;

  editValidation: Partial<AdminAddEditUserArguments["record"]>;
  editRequestStatus: RequestStatus;

  delRequestStatus: RequestStatus;
} = {
  listUsers: [],
  listRequestStatus: RequestStatus.INIT,

  oneUser: null,
  oneUserRequestStatus: RequestStatus.INIT,

  addValidation: {},
  addRequestStatus: RequestStatus.INIT,

  editValidation: {},
  editRequestStatus: RequestStatus.INIT,

  delRequestStatus: RequestStatus.INIT,
};

export const adminsListThunk = createAsyncThunk("admin/adminUsers/list", () => {
  return trpc.query("admin.adminUsers.list");
});

export const adminsGetThunk = createAsyncThunk("admin/adminUsers/get", (_id: string) => {
  return trpc.query("admin.adminUsers.get", { _id });
});

export const adminAddThunk = createAsyncThunk("admin/adminUsers/add", (record: AdminAddEditUserArguments["record"]) => {
  return trpc.mutation("admin.adminUsers.add", {
    record,
  });
});

export const adminEditThunk = createAsyncThunk("admin/adminUsers/edit", (data: AdminAddEditUserArguments) => {
  return trpc.mutation("admin.adminUsers.edit", data);
});

export const adminDelThunk = createAsyncThunk("admin/adminUsers/del", (_id: string) => {
  return trpc.mutation("admin.adminUsers.del", { _id });
});

const admins = createSlice({
  name: "admin/adminUsers",
  initialState,
  reducers: {
    clearListUsers: (state) => {
      state.listUsers = [];
      state.listRequestStatus = RequestStatus.INIT;
    },
    clearOneUser: (state) => {
      state.oneUser = null;
      state.oneUserRequestStatus = RequestStatus.INIT;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminsListThunk.pending, (state) => {
        state.listRequestStatus = RequestStatus.PENDING;
      })
      .addCase(adminsListThunk.fulfilled, (state, { payload }) => {
        state.listRequestStatus = RequestStatus.FULFILLED;
        state.listUsers = payload;
      })
      .addCase(adminsListThunk.rejected, (state) => {
        state.listRequestStatus = RequestStatus.REJECTED;
      });

    builder
      .addCase(adminsGetThunk.pending, (state) => {
        state.oneUserRequestStatus = RequestStatus.PENDING;
      })
      .addCase(adminsGetThunk.fulfilled, (state, { payload }) => {
        state.oneUserRequestStatus = RequestStatus.FULFILLED;
        state.oneUser = payload;
      })
      .addCase(adminsGetThunk.rejected, (state) => {
        state.oneUserRequestStatus = RequestStatus.REJECTED;
      });

    builder
      .addCase(adminAddThunk.pending, (state) => {
        state.addRequestStatus = RequestStatus.PENDING;
      })
      .addCase(adminAddThunk.fulfilled, (state) => {
        state.addRequestStatus = RequestStatus.FULFILLED;
      })
      .addCase(adminAddThunk.rejected, (state) => {
        state.addRequestStatus = RequestStatus.REJECTED;
      });

    builder
      .addCase(adminEditThunk.pending, (state) => {
        state.editRequestStatus = RequestStatus.PENDING;
      })
      .addCase(adminEditThunk.fulfilled, (state) => {
        state.editRequestStatus = RequestStatus.FULFILLED;
      })
      .addCase(adminEditThunk.rejected, (state) => {
        state.editRequestStatus = RequestStatus.REJECTED;
      });

    builder
      .addCase(adminDelThunk.pending, (state) => {
        state.delRequestStatus = RequestStatus.PENDING;
      })
      .addCase(adminDelThunk.fulfilled, (state) => {
        state.delRequestStatus = RequestStatus.FULFILLED;
      })
      .addCase(adminDelThunk.rejected, (state) => {
        state.delRequestStatus = RequestStatus.REJECTED;
      });
  },
});

export const adminUsersListSelector = (state: Store) => state.userAdmins.listUsers;
export const adminUsersListRequestStatusSelector = (state: Store) => state.userAdmins.listRequestStatus;
export const adminUserSelector = (state: Store) => state.userAdmins.oneUser;
export const adminUserRequestStatusSelector = (state: Store) => state.userAdmins.oneUserRequestStatus;

export const { clearListUsers, clearOneUser } = admins.actions;
export const userAdmins = admins.reducer;
