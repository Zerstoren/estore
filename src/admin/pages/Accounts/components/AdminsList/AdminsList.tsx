import React from "react";
import { NavLink } from "react-router-dom";
import cx from "classnames";

import { isPermitted, Permissions } from "src/utils/permissions";
import { useAdminList } from "./hooks/useAdminList";

import styles from "./adminList.module.scss";

export const AdminsList = () => {
  const { usersList, removeUser } = useAdminList();

  return (
    <>
      <h2 className="tm-block-title">Admins</h2>
      <table className="table tm-table-small tm-product-table">
        <thead>
          <tr>
            <td>Admin name</td>
            <td>Permissions</td>
            <td>
              <NavLink to="/admin/accounts/admins/add">
                <i className={cx("fas fa-plus", styles.adminListIconManipulation)} />
              </NavLink>
            </td>
          </tr>
        </thead>
        <tbody>
          {usersList &&
            usersList.map((user) => {
              const permissionsText: string[] = [];

              if (isPermitted(user.permission, Permissions.ORDERS)) {
                permissionsText.push("Orders");
              }
              if (isPermitted(user.permission, Permissions.PRODUCTS)) {
                permissionsText.push("Products");
              }
              if (isPermitted(user.permission, Permissions.USERS)) {
                permissionsText.push("Users");
              }
              if (isPermitted(user.permission, Permissions.ADMINS)) {
                permissionsText.push("Admins");
              }
              if (isPermitted(user.permission, Permissions.SETTINGS)) {
                permissionsText.push("Settings");
              }

              return (
                <tr key={user._id}>
                  <td className="tm-product-name">{user.name}</td>
                  <td>{permissionsText.join(" & ")}</td>
                  <td>
                    <NavLink to={`/admin/accounts/admins/edit/${user._id}`}>
                      <i className={cx("fas fa-edit", styles.adminListIconManipulation)} />
                    </NavLink>
                    <i
                      role="link"
                      area-label="Remove user"
                      onPointerDown={() => removeUser(user._id)}
                      className={cx("fas fa-ban", styles.adminListIconManipulation)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
