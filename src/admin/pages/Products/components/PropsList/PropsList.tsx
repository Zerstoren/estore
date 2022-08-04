import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import cx from "classnames";

import { SearchBlock } from "src/admin/components/SearchBlock";
import { PaginationBlock } from "src/admin/components/PaginationBlock";
import adminLinks from "src/admin/scss/links.module.scss";

import { usePropsList } from "./hooks/usePropsList";
import styles from "./propList.module.scss";

export const PropsList = () => {
  const { list, onSearch, showItem, hideItem, pagination } = usePropsList();

  return (
    <div>
      <h2 className="tm-block-title" data-id="root">
        Product properties
        <NavLink to="/admin/products/props/add" className={adminLinks.adminIconLinks}>
          <i className="fas fa-plus" />
        </NavLink>
      </h2>

      <SearchBlock onSearch={onSearch} />

      <div className={styles.propList}>
        {list.map((item) => {
          const link = `/admin/products/props/edit/${item._id}`;

          return (
            <Fragment key={item._id}>
              <div>
                <NavLink to={link} className={adminLinks.adminIconLinks}>
                  <i className="fas fa-pencil-alt" />
                </NavLink>
                {item.hidden ? (
                  <i className={cx("fas fa-eye", adminLinks.adminIconLinks)} onClick={() => showItem(item)} />
                ) : (
                  <i className={cx("fas fa-eye-slash", adminLinks.adminIconLinks)} onClick={() => hideItem(item)} />
                )}
              </div>
              <div className="text-white">
                {item.hidden ? (
                  <s>
                    {item.name} ({item.contextName})
                  </s>
                ) : (
                  <>
                    {item.name} ({item.contextName})
                  </>
                )}
              </div>
              <div className="text-white">{item.type}</div>
            </Fragment>
          );
        })}
      </div>

      <PaginationBlock {...pagination} />
    </div>
  );
};
