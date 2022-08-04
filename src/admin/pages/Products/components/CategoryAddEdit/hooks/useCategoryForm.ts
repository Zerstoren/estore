import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "src/admin/store/useAppDispatch";
import { transformTextToUrl } from "src/utils/forms/transformTextToUrl";
import {
  AdminCategories,
  categoryAddThunk,
  categoryEditThunk,
  clearCategoryList,
} from "src/admin/store/products/categories";

export type CategoryAddEditForm = {
  name: string;
  url: string;
  title: string;
  keywords: string;
  description: string;
};

export const useCategoryForm = (category: AdminCategories | null) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isPredefinedOpen = !!(category && (category.title || category.keywords || category.description));

  const methods = useForm<CategoryAddEditForm>();
  const { handleSubmit, setValue } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (category) {
      await dispatch(
        categoryEditThunk({
          _id: category._id,
          record: data,
        }),
      );
    } else {
      await dispatch(
        categoryAddThunk({
          ...data,
          url: data.url ? data.url : transformTextToUrl(data.name),
        }),
      );
    }

    await dispatch(clearCategoryList());
    navigate("/admin/products/categories");
  });

  const onSeoClear = () => {
    setValue("url", "");
    setValue("title", "");
    setValue("keywords", "");
    setValue("description", "");
  };

  useLayoutEffect(() => {
    if (!category) {
      return;
    }

    setValue("name", category.name);
    setValue("url", category.url);
    setValue("title", category.title);
    setValue("keywords", category.keywords);
    setValue("description", category.description);
  }, [setValue, category]);

  return {
    onSubmit,
    onSeoClear,
    methods,
    isPredefinedOpen,
  };
};
