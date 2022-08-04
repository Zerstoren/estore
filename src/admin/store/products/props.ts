import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import type { PropsAddEditArguments, PropsListArguments } from "pages/api/trpc/admin/props";
import type { PropsSchema } from "src/server/utils/dbSchema";
import { trpc } from "src/utils/network/trpc";

import { RequestStatus } from "src/utils/network/requestStatus";
import type { Store } from "src/admin/store";
import { RecursiveTransformObjectIdToString } from "src/server/utils/mongoHelpTypes";

export type AdminProps = { _id: string } & RecursiveTransformObjectIdToString<PropsSchema>;

const initialState: {
  list: {
    items: AdminProps[];
    status: RequestStatus;
    offset: number;
    limit: number;
    total: number;
    search: string;
  };
  props: AdminProps | null;
} = {
  list: {
    items: [],
    status: RequestStatus.INIT,
    offset: 0,
    limit: 10,
    total: 0,
    search: "",
  },
  props: null,
};

export const propsListThunk = createAsyncThunk("admin/props/list", (pagination: PropsListArguments) => {
  return trpc.query("admin.props.list", pagination);
});

export const propsGetThunk = createAsyncThunk("admin/props/get", (_id: string) => {
  return trpc.query("admin.props.get", { _id });
});

export const propsAddThunk = createAsyncThunk("admin/props/add", (record: PropsAddEditArguments["record"]) => {
  return trpc.mutation("admin.props.add", { record });
});

export const propsEditThunk = createAsyncThunk("admin/props/edit", (input: PropsAddEditArguments) => {
  return trpc.mutation("admin.props.edit", input);
});

export const propsDelThunk = createAsyncThunk("admin/props/del", (ids: Array<string>) => {
  return trpc.mutation("admin.props.del", { ids });
});

const prop = createSlice({
  name: "admin/props",
  initialState,
  reducers: {
    clearPropsList: (state) => {
      state.list = {
        items: [],
        status: RequestStatus.INIT,
        offset: 0,
        limit: 10,
        total: 0,
        search: "",
      };
    },
    clearProps: (state) => {
      state.props = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(propsListThunk.pending, (state, action) => {
        state.list.status = RequestStatus.PENDING;
      })
      .addCase(propsListThunk.fulfilled, (state, action) => {
        state.list = { ...action.payload, status: RequestStatus.FULFILLED };
      })
      .addCase(propsGetThunk.fulfilled, (state, action) => {
        state.props = action.payload;
      });
  },
});

const get = (state: Store) => state.props;
export const getPropsList = createSelector(get, (state) => {
  const { status, ...list } = state.list;
  return list;
});
export const getPropsProps = createSelector(get, (state) => state.props);

export const props = prop.reducer;
export const { clearPropsList, clearProps } = prop.actions;
