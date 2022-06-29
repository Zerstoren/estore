import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "src/admin/store/useAppDispatch";
import { getLoggedUserSelector } from "src/admin/store/user/auth";
import {
  adminUsersListRequestStatusSelector,
  adminUsersListSelector,
  delThunk,
  listThunk,
} from "src/admin/store/user/admin";
import { RequestStatus } from "src/utils/network/requestStatus";

export const useAdminList = () => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(getLoggedUserSelector);
  const usersList = useSelector(adminUsersListSelector);
  const usersListStatus = useSelector(adminUsersListRequestStatusSelector);

  const removeUser = (userId: string) => {
    if (userId === currentUser?._id) {
      return;
    }

    dispatch(delThunk(userId)).then(() => {
      dispatch(listThunk());
    });
  };

  useEffect(() => {
    if (usersListStatus === RequestStatus.INIT) {
      dispatch(listThunk());
    }
  }, []);

  return {
    usersList,
    removeUser,
  };
};
