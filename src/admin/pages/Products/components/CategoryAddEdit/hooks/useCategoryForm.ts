import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { MultiValue } from "react-select";

import { useAppDispatch } from "src/admin/store/useAppDispatch";
import { transformTextToUrl } from "src/utils/forms/transformTextToUrl";
import {
  AdminCategories,
  categoryAddThunk,
  categoryEditThunk,
  clearCategoryList,
} from "src/admin/store/products/categories";
import { AdminProps, propsListThunk } from "src/admin/store/products/props";

export type CategoryAddEditForm = {
  name: string;
  categoryProps: string[];
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

  const onSearchProps = async (inputValue: string) => {
    const result = await dispatch(
      propsListThunk({
        limit: 15,
        offset: 0,
        search: inputValue,
      }),
    );

    if (result) {
      const results = result.payload as { items: AdminProps[] };
      return results.items.map((prop) => {
        return {
          label: `${prop.name} (${prop.contextName})`,
          value: prop._id,
        };
      });
    }

    return [];
  };

  const onChangeProps = (options: MultiValue<{ label: string; value: string }>) => {
    setValue(
      "categoryProps",
      options.map((option) => option.value),
    );
  };

  return {
    onSubmit,
    onSeoClear,
    onSearchProps,
    onChangeProps,
    methods,
    isPredefinedOpen,
  };
};
