import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { addThunk, AdminUser, clearListUsers, editThunk } from "src/admin/store/user/admin";
import { isPermitted, Permissions } from "src/utils/permissions";
import { useAppDispatch } from "src/admin/store/useAppDispatch";

import type { AdminAddEditForm } from "../AdminAddEdit";

export const useAddEditForm = (user: AdminUser | null, isAdd: boolean) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm<AdminAddEditForm>();
  const { setValue } = methods;

  useEffect(() => {
    const permission = user?.permission || 0;
    setValue("name", user?.name || "");
    setValue("permissions1", isPermitted(permission, Permissions.ORDERS));
    setValue("permissions2", isPermitted(permission, Permissions.PRODUCTS));
    setValue("permissions4", isPermitted(permission, Permissions.USERS));
    setValue("permissions8", isPermitted(permission, Permissions.ADMINS));
    setValue("permissions16", isPermitted(permission, Permissions.SETTINGS));
  }, [user?._id]);

  const onSubmit = methods.handleSubmit((data) => {
    const permission = Object.keys(data).reduce((accum, itemKeyNoType) => {
      const itemKey = itemKeyNoType as keyof typeof data;
      const value = data[itemKey];

      if (!itemKey.includes("permissions")) {
        return accum;
      }

      const permissionLevel = value ? parseInt(itemKey.replace("permissions", "")) : 0;

      if (!permissionLevel) {
        return accum;
      }

      return accum + permissionLevel;
    }, 0);

    dispatch(clearListUsers());

    if (user) {
      dispatch(
        editThunk({
          _id: user._id,
          record: {
            permission,
            name: data.name,
            password: data.password,
          },
        }),
      ).then(() => {
        navigate("/admin/accounts/admins");
      });

      return;
    }

    dispatch(
      addThunk({
        permission,
        name: data.name,
        password: data.password,
      }),
    ).then(() => {
      navigate("/admin/accounts/admins");
    });
  });

  return {
    onSubmit,
    methods,
  };
};
