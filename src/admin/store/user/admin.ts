import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { trpc } from "src/utils/network/trpc";
import { AdminAddEditUserArguments } from "pages/api/trpc/admin/users";
import { RequestStatus } from "src/utils/network/requestStatus";
import type { Store } from "src/admin/store";

export type AdminUser = {
  _id: string;
  name: string;
  permission: number;
};

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

export const listThunk = createAsyncThunk("admin/adminUsers/list", () => {
  return trpc.query("admin.adminUsers.list");
});

export const getThunk = createAsyncThunk("admin/adminUsers/get", (_id: string) => {
  return trpc.query("admin.adminUsers.get", { _id });
});

export const addThunk = createAsyncThunk("admin/adminUsers/add", (record: AdminAddEditUserArguments["record"]) => {
  return trpc.mutation("admin.adminUsers.add", {
    record,
  });
});

export const editThunk = createAsyncThunk("admin/adminUsers/edit", (data: AdminAddEditUserArguments) => {
  return trpc.mutation("admin.adminUsers.edit", data);
});

export const delThunk = createAsyncThunk("admin/adminUsers/del", (_id: string) => {
  return trpc.mutation("admin.adminUsers.del", { _id });
});

const admin = createSlice({
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
      .addCase(listThunk.pending, (state) => {
        state.listRequestStatus = RequestStatus.PENDING;
      })
      .addCase(listThunk.fulfilled, (state, { payload }) => {
        state.listRequestStatus = RequestStatus.FULFILLED;
        state.listUsers = payload;
      })
      .addCase(listThunk.rejected, (state) => {
        state.listRequestStatus = RequestStatus.REJECTED;
      });

    builder
      .addCase(getThunk.pending, (state) => {
        state.oneUserRequestStatus = RequestStatus.PENDING;
      })
      .addCase(getThunk.fulfilled, (state, { payload }) => {
        state.oneUserRequestStatus = RequestStatus.FULFILLED;
        state.oneUser = payload;
      })
      .addCase(getThunk.rejected, (state) => {
        state.oneUserRequestStatus = RequestStatus.REJECTED;
      });

    builder
      .addCase(addThunk.pending, (state) => {
        state.addRequestStatus = RequestStatus.PENDING;
      })
      .addCase(addThunk.fulfilled, (state) => {
        state.addRequestStatus = RequestStatus.FULFILLED;
      })
      .addCase(addThunk.rejected, (state) => {
        state.addRequestStatus = RequestStatus.REJECTED;
      });

    builder
      .addCase(editThunk.pending, (state) => {
        state.editRequestStatus = RequestStatus.PENDING;
      })
      .addCase(editThunk.fulfilled, (state) => {
        state.editRequestStatus = RequestStatus.FULFILLED;
      })
      .addCase(editThunk.rejected, (state) => {
        state.editRequestStatus = RequestStatus.REJECTED;
      });

    builder
      .addCase(delThunk.pending, (state) => {
        state.delRequestStatus = RequestStatus.PENDING;
      })
      .addCase(delThunk.fulfilled, (state) => {
        state.delRequestStatus = RequestStatus.FULFILLED;
      })
      .addCase(delThunk.rejected, (state) => {
        state.delRequestStatus = RequestStatus.REJECTED;
      });
  },
});

export const adminUsersListSelector = (state: Store) => state.userAdmins.listUsers;
export const adminUsersListRequestStatusSelector = (state: Store) => state.userAdmins.listRequestStatus;
export const adminUserSelector = (state: Store) => state.userAdmins.oneUser;
export const adminUserRequestStatusSelector = (state: Store) => state.userAdmins.oneUserRequestStatus;

export const { clearListUsers, clearOneUser } = admin.actions;
export const userAdmins = admin.reducer;
