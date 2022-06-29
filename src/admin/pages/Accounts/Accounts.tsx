import React from "react";
import dynamic from "next/dynamic";
import { Route, Routes } from "react-router-dom";

import { LocalMenu } from "src/admin/components/LocalMenu";

const UsersList = dynamic(() => import("src/admin/pages/Accounts/components/UsersList"));
const AdminsList = dynamic(() => import("src/admin/pages/Accounts/components/AdminsList"));
const AdminAddEdit = dynamic(() => import("src/admin/pages/Accounts/components/AdminAddEdit"));

export type RouteParamsAdminEdit = { id: string };

export const Accounts = () => {
  const localMenuItems = [
    {
      name: "Users",
      url: "/admin/accounts",
    },
    {
      name: "Admins",
      url: "/admin/accounts/admins",
    },
  ];

  return (
    <>
      <LocalMenu baseUrl="/admin/accounts" menu={localMenuItems} />
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/admins" element={<AdminsList />} />
        <Route path="/admins/add" element={<AdminAddEdit isAdd />} />
        <Route path="/admins/edit/:id" element={<AdminAddEdit />} />
      </Routes>
    </>
  );
};
