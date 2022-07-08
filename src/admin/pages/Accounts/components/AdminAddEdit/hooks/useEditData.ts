import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { type RouteParamsAdminEdit } from "src/admin/pages/Accounts/Accounts";
import { useAppDispatch } from "src/admin/store/useAppDispatch";
import { adminUserRequestStatusSelector, adminUserSelector, adminsGetThunk } from "src/admin/store/user/userAdmins";
import { RequestStatus } from "src/utils/network/requestStatus";

export const useEditData = () => {
  const dispatch = useAppDispatch();
  const params = useParams<RouteParamsAdminEdit>();
  const user = useSelector(adminUserSelector);
  const userStatus = useSelector(adminUserRequestStatusSelector);

  const isEdit = !!("id" in params && params.id);

  useEffect(() => {
    if (isEdit && userStatus === RequestStatus.INIT) {
      dispatch(adminsGetThunk(params.id));
    }
  }, []);

  return {
    isEdit,
    user,
  };
};
