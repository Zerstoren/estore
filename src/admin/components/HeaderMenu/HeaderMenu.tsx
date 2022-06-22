/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cx from "classnames";

import { useAppDispatch } from "src/admin/store/useAppDispatch";
import { logoutThunk } from "src/admin/store/user/auth";

export const HeaderMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isShowNavBar, setIsShowNavBar] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/admin");
  };

  const toggleNavBar = () => {
    setIsShowNavBar(!isShowNavBar);
  };

  const { pathname } = useLocation();

  const highLinks = [
    {
      icon: "fa-tachometer-alt",
      name: "Dashboard",
      link: "/admin",
    },
    // {
    //   icon: "fa-file-alt",
    //   name: "Reports",
    //   link: "/admin/reports",
    // },
    {
      icon: "fa-shopping-cart",
      name: "Products",
      link: "/admin/products",
    },
    {
      icon: "fa-user",
      name: "Accounts",
      link: "/admin/accounts",
    },
    {
      icon: "fa-cog",
      name: "Settings",
      link: "/admin/settings",
    },
  ];

  return (
    <nav className="navbar navbar-expand-xl">
      <div className="container h-100">
        <Link className="navbar-brand" to="/admin">
          <h1 className="tm-site-title mb-0">EStore</h1>
        </Link>
        <button className="navbar-toggler ml-auto mr-0" type="button" onPointerDown={toggleNavBar}>
          <i className="fas fa-bars tm-nav-icon" />
        </button>

        <div className={cx("collapse navbar-collapse", isShowNavBar && "show")} id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto h-100">
            {highLinks.map((item) => {
              return (
                <li className="nav-item" key={item.link}>
                  <Link
                    className={cx(
                      "nav-link",
                      (item.link === "/admin" ? pathname === item.link : pathname.includes(item.link)) && "active",
                    )}
                    to={item.link}
                  >
                    <i className={cx("fas", item.icon)} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link d-block" onClick={handleLogout}>
                <b>Logout</b>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
