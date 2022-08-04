import React from "react";
import { NavLink } from "react-router-dom";

import adminLinks from "src/admin/scss/links.module.scss";

export const ProductsList = () => {
  return (
    <div>
      <h2 className="tm-block-title" data-id="root">
        Products{" "}
        <NavLink to="/admin/products/add" className={adminLinks.adminIconLinks}>
          <i className="fas fa-plus" />
        </NavLink>
      </h2>
    </div>
  );
};
