import React from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes as ReactRoutes, useLocation } from "react-router-dom";

import { isLoggedUserSelector } from "src/admin/store/user/auth";
import { BaseLayout } from "src/admin/layout/base";
import { isServerSide } from "src/utils/ssr/isServerSide";

const Dashboard = dynamic(() => import("src/admin/pages/Dashboard"));
const Login = dynamic(() => import("src/admin/pages/Login"));
const Products = dynamic(() => import("src/admin/pages/Products"));
const Accounts = dynamic(() => import("src/admin/pages/Accounts"));

export const Routes = () => {
  const isLoggedUser = useSelector(isLoggedUserSelector);
  const { pathname } = useLocation();

  if (!isLoggedUser && pathname !== "/admin" && !isServerSide()) {
    return <Navigate to="/admin" />;
  }

  return (
    <BaseLayout isLogin={isLoggedUser}>
      <ReactRoutes>
        <Route path="/admin/accounts/*" element={<Accounts />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin" element={isLoggedUser ? <Dashboard /> : <Login />} />
      </ReactRoutes>
    </BaseLayout>
  );
};
