import { useSelector } from "react-redux";
import { useEffect } from "react";

import { useAppDispatch } from "src/admin/store/useAppDispatch";
import { categoryListThunk, getListRequestStatus, getTree } from "src/admin/store/products/categories";
import { RequestStatus } from "src/utils/network/requestStatus";

export const useCategoryTree = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector(getTree);
  const listRequestStatus = useSelector(getListRequestStatus);

  useEffect(() => {
    if (listRequestStatus !== RequestStatus.FULFILLED) {
      dispatch(categoryListThunk());
    }
  }, [categories, dispatch, listRequestStatus]);

  return categories;
};
