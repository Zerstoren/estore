import React, { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cx from "classnames";

import styles from "./localMenu.module.scss";

type LocalMenuProps = {
  baseUrl: string;
  menu: Array<{ name: string; url: string }>;
};

export const LocalMenu: FC<LocalMenuProps> = ({ baseUrl, menu }) => {
  const { pathname } = useLocation();

  return (
    <div className={styles.mainBlock}>
      {menu.map((item) => {
        return (
          <div className={styles.menuItem} key={item.url}>
            <NavLink
              className={cx(
                styles.navLink,
                (item.url === baseUrl ? pathname === item.url : pathname.includes(item.url)) && styles.navLinkActive,
              )}
              to={item.url}
            >
              {item.name}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};
