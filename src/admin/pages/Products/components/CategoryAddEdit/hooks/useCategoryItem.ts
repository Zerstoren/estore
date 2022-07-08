import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { type RouteParamsCategoryEdit } from "src/admin/pages/Products/Products";
import { categoryGetThunk, clearCategoryOne, getOneCategory } from "src/admin/store/products/categories";
import { useAppDispatch } from "src/admin/store/useAppDispatch";

export const useCategoryItem = () => {
  const dispatch = useAppDispatch();
  const params = useParams<RouteParamsCategoryEdit>();
  const category = useSelector(getOneCategory);

  const isEdit = !!("id" in params && params.id);

  useEffect(() => {
    if (isEdit) {
      dispatch(categoryGetThunk(params.id));
    }

    return () => {
      dispatch(clearCategoryOne());
    };
  }, [params.id]);

  return category;
};
