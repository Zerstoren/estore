import React, { FC } from "react";
import cx from "classnames";

import { useAddEditForm } from "./hooks/useAddEditForm";
import { useEditData } from "./hooks/useEditData";

import styles from "./adminAddEdit.module.scss";

export type AdminAddEditForm = {
  name: string;
  password: string;
  permissions1: number;
  permissions2: number;
  permissions4: number;
  permissions8: number;
  permissions16: number;
};

type AdminAddEditProps = {
  isAdd?: boolean;
};

export const AdminAddEdit: FC<AdminAddEditProps> = ({ isAdd = false }) => {
  const { user } = useEditData();
  const {
    onSubmit,
    methods: { register },
  } = useAddEditForm(user, isAdd);

  if (!user && !isAdd) {
    return null;
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="tm-block-title">{isAdd ? "Add new admin" : `Edit, ${user?.name}`}</h2>
      <div className="form-group mb-3">
        <div className="form-floating">
          <input {...register("name")} id="name" className="form-control validate" />
          <label htmlFor="name">Admin name</label>
        </div>
      </div>

      <div className="form-group mb-3">
        <div className="form-floating">
          <input {...register("password")} type="password" id="password" className="form-control validate" />
          <label htmlFor="password">{`Password${!isAdd ? " (Leave blank for not apply change password)" : ""}`}</label>
        </div>
      </div>

      <div className={cx("form-group mb-3", styles.adminAddEditGroup)}>
        <div className={cx("form-check", styles.adminAddEditGroupElement)}>
          <input {...register("permissions1")} className="form-check-input" type="checkbox" id="orders" />
          <label className={cx("form-check-label", styles.adminAddEditLabel)} htmlFor="orders">
            Orders
          </label>
        </div>

        <div className={cx("form-check", styles.adminAddEditGroupElement)}>
          <input {...register("permissions2")} className="form-check-input" type="checkbox" id="products" />
          <label className={cx("form-check-label", styles.adminAddEditLabel)} htmlFor="products">
            Products
          </label>
        </div>

        <div className={cx("form-check", styles.adminAddEditGroupElement)}>
          <input {...register("permissions4")} className="form-check-input" type="checkbox" id="users" />
          <label className={cx("form-check-label", styles.adminAddEditLabel)} htmlFor="users">
            Users
          </label>
        </div>

        <div className={cx("form-check", styles.adminAddEditGroupElement)}>
          <input {...register("permissions8")} className="form-check-input" type="checkbox" id="admins" />
          <label className={cx("form-check-label", styles.adminAddEditLabel)} htmlFor="admins">
            Admins
          </label>
        </div>

        <div className={cx("form-check", styles.adminAddEditGroupElement)}>
          <input {...register("permissions16")} className="form-check-input" type="checkbox" id="settings" />
          <label className={cx("form-check-label", styles.adminAddEditLabel)} htmlFor="settings">
            Settings
          </label>
        </div>
      </div>

      <div className={cx("form-group mb-3")}>
        <button type="submit" className="btn btn-primary btn-block text-uppercase">
          {isAdd ? "Create" : "Edit"}
        </button>
      </div>
    </form>
  );
};
