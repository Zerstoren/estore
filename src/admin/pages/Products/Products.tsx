import React from "react";
import { Route, Routes } from "react-router-dom";
import dynamic from "next/dynamic";

import { LocalMenu } from "src/admin/components/LocalMenu";

const CategoryAddEdit = dynamic(() => import("./components/CategoryAddEdit"));
const CategoryTree = dynamic(() => import("./components/CategoryTree"));
const ProductAddEdit = dynamic(() => import("./components/ProductAddEdit"));
const ProductItem = dynamic(() => import("./components/ProductItem"));
const ProductsList = dynamic(() => import("./components/ProductsList"));

export type RouteParamsProductEdit = { id: string };
export type RouteParamsCategoryEdit = { id: string };

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
  ];

  return (
    <>
      <LocalMenu baseUrl="/admin/products" menu={localMenuItems} />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/product" element={<ProductItem />} />
        <Route path="/product/add" element={<ProductAddEdit />} />
        <Route path="/product/edit/:id" element={<ProductAddEdit />} />
        <Route path="/categories" element={<CategoryTree />} />
        <Route path="/categories/add" element={<CategoryAddEdit isAdd />} />
        <Route path="/categories/edit/:id" element={<CategoryAddEdit />} />
      </Routes>
    </>
  );
};
