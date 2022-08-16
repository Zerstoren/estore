import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AdminProduct, clearProductList, productAddThunk, productEditThunk } from "src/admin/store/products/products";
import { useAppDispatch } from "src/admin/store/useAppDispatch";
import { AdminCategories, categoryListThunk } from "src/admin/store/products/categories";
import { SingleValue } from "react-select";

export type ProductAddEditForm = {
  name: string;
  url: string;
  sku: string;
  price: string;

  category_id: string;
  props: Record<string, string | boolean | Record<string, boolean>>;

  title: string;
  keywords: string;
  description: string;
};

export const useProductForm = (product: AdminProduct | null) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState("");
  const isPredefinedOpen = !!(product && (product.title || product.keywords || product.description));

  const methods = useForm<ProductAddEditForm>();
  const { handleSubmit, setValue } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (!product) {
      await dispatch(
        productAddThunk({
          ...data,
          image_pull: "",
          price: parseInt(data.price),
        }),
      );
    } else {
      await dispatch(
        productEditThunk({
          _id: product._id,
          record: {
            ...data,
            image_pull: "",
            price: parseInt(data.price),
          },
        }),
      );
    }

    await dispatch(clearProductList());
    navigate("/admin/products");
  });

  const onSearchCategory = async (inputValue: string) => {
    if (!inputValue) {
      return [];
    }

    const { payload } = await dispatch(categoryListThunk(inputValue));
    const categoriesList = payload as Array<AdminCategories>;
    return categoriesList.map((category) => ({
      label: category.name,
      value: category._id,
    }));
  };

  const onChangeCategory = (value: SingleValue<{ label: string; value: string }>) => {
    setValue("category_id", value ? value.value : "");
    setCategoryId(value ? value.value : "");
  };

  const onSeoClear = () => {
    setValue("url", "");
    setValue("title", "");
    setValue("keywords", "");
    setValue("description", "");
  };

  return {
    onSeoClear,
    onSearchCategory,
    onChangeCategory,
    methods,
    onSubmit,
    isPredefinedOpen,
    categoryId,
  };
};
