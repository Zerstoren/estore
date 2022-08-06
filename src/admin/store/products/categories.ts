import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

import {
  CategoriesAddEditArguments,
  CategoriesChangeParentArguments,
  CategoriesDelArguments,
} from "pages/api/trpc/admin/categories";

import { RequestStatus } from "src/utils/network/requestStatus";
import { type CategoriesSchema } from "src/server/utils/dbSchema";
import { trpc } from "src/utils/network/trpc";
import type { Store } from "src/admin/store";

export type AdminCategories = {
  _id: string;
  parent_id: string | null;
  categoryProps: { value: string; label: string }[];
} & Omit<CategoriesSchema, "parent_id" | "categoryProps">;

export type AdminCategoryTree = {
  children: AdminCategoryTree[];
} & AdminCategories;

const initialState: {
  list: Array<AdminCategories>;
  listRequestStatus: RequestStatus;

  oneCategory: AdminCategories | null;
  oneCategoryRequestStatus: RequestStatus;

  addValidation: Partial<CategoriesAddEditArguments["record"]>;
  editValidation: Partial<CategoriesAddEditArguments["record"]>;
} = {
  list: [],
  listRequestStatus: RequestStatus.INIT,

  oneCategory: null,
  oneCategoryRequestStatus: RequestStatus.INIT,

  addValidation: {},
  editValidation: {},
};

export const categoryListThunk = createAsyncThunk("admin/categories/list", (search?: string) => {
  return trpc.query("admin.categories.list", { search });
});

export const categoryGetThunk = createAsyncThunk("admin/categories/get", (_id: string) => {
  return trpc.query("admin.categories.get", { _id });
});

export const categoryChangeParentThunk = createAsyncThunk(
  "admin/categories/changeParent",
  (input: CategoriesChangeParentArguments) => {
    return trpc.mutation("admin.categories.change_parent", input);
  },
);

export const categoryAddThunk = createAsyncThunk(
  "admin/categories/add",
  (record: CategoriesAddEditArguments["record"]) => {
    return trpc.mutation("admin.categories.add", { record });
  },
);

export const categoryEditThunk = createAsyncThunk("admin/categories/edit", (input: CategoriesAddEditArguments) => {
  return trpc.mutation("admin.categories.edit", input);
});

export const categoryDelThunk = createAsyncThunk("admin/categories/del", ({ ids }: CategoriesDelArguments) => {
  return trpc.mutation("admin.categories.del", { ids });
});

const cats = createSlice({
  name: "admin/categories",
  initialState,
  reducers: {
    clearCategoryList: (state) => {
      state.list = [];
      state.listRequestStatus = RequestStatus.INIT;
    },
    clearCategoryOne: (state) => {
      state.oneCategory = null;
      state.oneCategoryRequestStatus = RequestStatus.INIT;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryListThunk.pending, (state) => {
        state.listRequestStatus = RequestStatus.PENDING;
      })
      .addCase(categoryListThunk.fulfilled, (state, action) => {
        state.listRequestStatus = RequestStatus.FULFILLED;
        state.list = action.payload;
      })
      .addCase(categoryListThunk.rejected, (state) => {
        state.listRequestStatus = RequestStatus.REJECTED;
      });

    builder
      .addCase(categoryGetThunk.pending, (state) => {
        state.oneCategoryRequestStatus = RequestStatus.PENDING;
      })
      .addCase(categoryGetThunk.fulfilled, (state, action) => {
        state.oneCategoryRequestStatus = RequestStatus.FULFILLED;
        state.oneCategory = action.payload;
      })
      .addCase(categoryGetThunk.rejected, (state) => {
        state.oneCategoryRequestStatus = RequestStatus.REJECTED;
      });

    // builder
    //   .addCase(categoryAddThunk.pending, (state, action) => {})
    //   .addCase(categoryAddThunk.fulfilled, (state, action) => {})
    //   .addCase(categoryAddThunk.rejected, (state, action) => {});

    // builder
    //   .addCase(categoryEditThunk.pending, (state, action) => {})
    //   .addCase(categoryEditThunk.fulfilled, (state, action) => {})
    //   .addCase(categoryEditThunk.rejected, (state, action) => {});
  },
});

const iterateChildTree = (parent: AdminCategoryTree, categories: AdminCategories[]) => {
  const children = categories
    .filter((category) => category.parent_id === parent._id || (category.parent_id === null && parent._id === ""))
    .map((child) => {
      return {
        children: [],
        ...child,
      };
    });

  if (children.length) {
    parent.children = children;
    children.forEach((child) => iterateChildTree(child, categories));
  }
};

export const getList = (state: Store) => state.categories.list;
export const getListRequestStatus = (state: Store) => state.categories.listRequestStatus;
export const getOneCategory = (state: Store) => state.categories.oneCategory;
export const getTree = createSelector(getList, (list) => {
  const rootNode: AdminCategoryTree = {
    children: [],
    categoryProps: [],
    parent_id: null,
    name: "",
    url: "",
    title: "",
    keywords: "",
    description: "",
    _id: "",
  };

  iterateChildTree(rootNode, list);

  return rootNode;
});

export const { clearCategoryList, clearCategoryOne } = cats.actions;
export const categories = cats.reducer;
