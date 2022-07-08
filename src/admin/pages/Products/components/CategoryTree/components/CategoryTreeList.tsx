import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import cx from "classnames";

import { AdminCategoryTree } from "src/admin/store/products/categories";
import adminLinks from "src/admin/scss/links.module.scss";

import { useCategoryDelete } from "../hooks/useCategoryDelete";
import { useCategoryDrag } from "../hooks/useCategoryDrag";
import styles from "./categoriesTree.module.scss";

type ItemProps = {
  category: AdminCategoryTree;
};

const CategoryTreeItem: FC<ItemProps> = ({ category }) => {
  const ref = useCategoryDrag();
  const onDelete = useCategoryDelete(category);

  return (
    <div key={category._id} style={{ marginLeft: "16px" }}>
      <div ref={ref} data-id={category._id} className={cx("category-tree-item", styles.categoriesTreeElement)}>
        {category.name}
      </div>

      <NavLink to={`/admin/products/categories/edit/${category._id}`} className={adminLinks.adminIconLinks}>
        <i className="fas fa-pen" />
      </NavLink>

      <i className={cx("fas fa-ban", adminLinks.adminIconLinks)} onClick={onDelete} />

      {!!category.children.length && (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        <CategoryTreeList categories={category.children} />
      )}
    </div>
  );
};

type ListProps = {
  categories: AdminCategoryTree[];
};

export const CategoryTreeList: FC<ListProps> = ({ categories }) => {
  return (
    <>
      {categories.map((category) => (
        <CategoryTreeItem key={category._id} category={category} />
      ))}
    </>
  );
};
