import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type ProductsSchema } from "src/server/utils/dbSchema";
import { RequestStatus } from "src/utils/network/requestStatus";
import { trpc } from "src/utils/network/trpc";
import { ProductsAddEditArguments, ProductsListArguments } from "pages/api/trpc/admin/products";

export type AdminProduct = {
  _id: string;
  category_id: string;
  specifications: Array<[string, Array<string>]>;
} & Omit<ProductsSchema, "category_id" | "image_pull" | "stock" | "specifications">;

const initialState: {
  list: Array<AdminProduct>;
  listRequestStatus: RequestStatus;
  product: AdminProduct | null;
} = {
  list: [],
  listRequestStatus: RequestStatus.INIT,
  product: null,
};

export const productListThunk = createAsyncThunk("admin/products/list", (pagination: ProductsListArguments) => {
  return trpc.query("admin.products.list", pagination);
});

export const productGetThunk = createAsyncThunk("admin/products/get", (_id: string) => {
  return trpc.query("admin.products.get", { _id });
});

export const productAddThunk = createAsyncThunk("admin/products/add", (record: ProductsAddEditArguments["record"]) => {
  return trpc.mutation("admin.products.add", { record });
});

export const productEditThunk = createAsyncThunk("admin/products/edit", (input: ProductsAddEditArguments) => {
  return trpc.mutation("admin.products.edit", input);
});

export const productDelThunk = createAsyncThunk("admin/products/del", (ids: Array<string>) => {
  return trpc.mutation("admin.products.del", { ids });
});

const prods = createSlice({
  name: "admin/products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productListThunk.pending, (state) => {
        state.listRequestStatus = RequestStatus.PENDING;
      })
      .addCase(productListThunk.fulfilled, (state, action) => {
        state.list = action.payload;
        state.listRequestStatus = RequestStatus.FULFILLED;
      })
      .addCase(productListThunk.rejected, (state) => {
        state.listRequestStatus = RequestStatus.REJECTED;
      });

    builder.addCase(productGetThunk.fulfilled, (state, action) => {
      state.product = action.payload;
    });
  },
});

export const products = prods.reducer;
