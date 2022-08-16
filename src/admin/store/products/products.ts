import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

import { type ProductsSchema } from "src/server/utils/dbSchema";
import { RequestStatus } from "src/utils/network/requestStatus";
import { trpc } from "src/utils/network/trpc";
import { AdminProps } from "src/admin/store/products/props";
import { ProductsAddEditArguments, ProductsListArguments } from "pages/api/trpc/admin/products";
import { type Store } from "src/admin/store";

export type AdminProduct = {
  _id: string;
  category_id: string;
  specifications: Array<[string, Array<string>]>;
} & Omit<ProductsSchema, "category_id" | "image_pull" | "stock" | "specifications">;

const initialState: {
  list: Array<AdminProduct>;
  listRequestStatus: RequestStatus;
  product: {
    data: AdminProduct | null;
    props: AdminProps[] | null;
  };
} = {
  list: [],
  listRequestStatus: RequestStatus.INIT,
  product: {
    data: null,
    props: null,
  },
};

export const productListThunk = createAsyncThunk("admin/products/list", (pagination: ProductsListArguments) => {
  return trpc.query("admin.products.list", pagination);
});

export const productGetThunk = createAsyncThunk("admin/products/get", (_id: string) => {
  return trpc.query("admin.products.get", { _id });
});

export const productGetPropsByCategory = createAsyncThunk("admin/products/propsByCategory", (_id: string) => {
  return trpc.query("admin.props.byCategory", { _id });
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
  reducers: {
    clearProductList: (state) => {
      state.list = [];
      state.listRequestStatus = RequestStatus.INIT;
    },
  },
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
      state.product.data = action.payload;
    });

    builder.addCase(productGetPropsByCategory.fulfilled, (state, action) => {
      state.product.props = action.payload;
    });
  },
});

const get = (state: Store) => state.products;
export const getProductPropsSelector = createSelector([get], (products) => products.product.props);

export const { clearProductList } = prods.actions;

export const products = prods.reducer;
