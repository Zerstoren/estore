import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AdminProduct, productEditThunk } from "src/admin/store/products/products";
import { useAppDispatch } from "src/admin/store/useAppDispatch";

export type ProductAddEditForm = {
  name: string;
  url: string;
  sku: string;
  price: number;

  title: string;
  keywords: string;
  description: string;
};

export const useProductForm = (product: AdminProduct | null) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isPredefinedOpen = !!(product && (product.title || product.keywords || product.description));

  const methods = useForm<ProductAddEditForm>();
  const { handleSubmit, setValue } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // await dispatch(
    //   productEditThunk({
    //     _id: product._id,
    //     record: data,
    //   }),
    // );
    //
    // await dispatch(clearProductList());
    // navigate("/admin/products");
  });

  const onSeoClear = () => {
    setValue("url", "");
    setValue("title", "");
    setValue("keywords", "");
    setValue("description", "");
  };

  return {
    methods,
    onSubmit,
    onSeoClear,
    isPredefinedOpen,
  };
};
