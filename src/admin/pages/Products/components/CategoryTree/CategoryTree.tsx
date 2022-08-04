import React from "react";
import { NavLink } from "react-router-dom";

import adminLinks from "src/admin/scss/links.module.scss";

import { useCategoryTree } from "./hooks/useCategoryTree";
import { CategoryTreeList } from "./components/CategoryTreeList";

export const CategoryTree = () => {
  const categories = useCategoryTree();

  return (
    <div>
      <h2 className="tm-block-title category-tree-item" data-id="root">
        Categories Tree
        <NavLink to="/admin/products/categories/add" className={adminLinks.adminIconLinks}>
          <i className="fas fa-plus" />
        </NavLink>
      </h2>

      <div>
        <CategoryTreeList categories={categories.children} />
      </div>
    </div>
  );
};
