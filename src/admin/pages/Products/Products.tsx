import React from "react";
import { Route, Routes } from "react-router-dom";
import dynamic from "next/dynamic";

import { LocalMenu } from "src/admin/components/LocalMenu";

const CategoryAddEdit = dynamic(() => import("./components/CategoryAddEdit"));
const CategoryTree = dynamic(() => import("./components/CategoryTree"));
const ProductAddEdit = dynamic(() => import("./components/ProductAddEdit"));
const ProductsList = dynamic(() => import("./components/ProductsList"));
const PropsList = dynamic(() => import("./components/PropsList"));
const PropsAddEdit = dynamic(() => import("./components/PropsAddEdit"));

export type RouteParamsProductEdit = { id: string };
export type RouteParamsCategoryEdit = { id: string };
export type RouteParamsPropsEdit = { id: string };

export const Products = () => {
  const localMenuItems = [
    {
      name: "Products",
      url: "/admin/products",
    },
    {
      name: "Categories",
      url: "/admin/products/categories",
    },
    {
      name: "Props",
      url: "/admin/products/props",
    },
  ];

  return (
    <>
      <LocalMenu baseUrl="/admin/products" menu={localMenuItems} />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/add" element={<ProductAddEdit isAdd />} />
        <Route path="/edit/:id" element={<ProductAddEdit />} />

        <Route path="/categories" element={<CategoryTree />} />
        <Route path="/categories/add" element={<CategoryAddEdit isAdd />} />
        <Route path="/categories/edit/:id" element={<CategoryAddEdit />} />

        <Route path="/props" element={<PropsList />} />
        <Route path="/props/add" element={<PropsAddEdit isAdd />} />
        <Route path="/props/edit/:id" element={<PropsAddEdit />} />
      </Routes>
    </>
  );
};
