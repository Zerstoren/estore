import React from "react";
import { LocalMenu } from "src/admin/components/LocalMenu";
import { Route, Routes } from "react-router-dom";
import { UsersList } from "src/admin/pages/Accounts/components/UsersList";
import { AdminsList } from "src/admin/pages/Accounts/components/AdminsList";

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
      </Routes>
    </>
  );
};
