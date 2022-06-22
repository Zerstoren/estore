import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export type AdminUser = {
  name: string;
  permission: number;
};

const adminUsersAdapter = createEntityAdapter<AdminUser>();
const initialState = adminUsersAdapter.getInitialState();

const admin = createSlice({
  name: "admin/adminUsers",
  initialState,
  reducers: {},
});
