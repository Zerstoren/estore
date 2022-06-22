import React from "react";
import cx from "classnames";

import { useLoginForm } from "./hooks/useLoginForm";

export const Login = () => {
  const { errors, register, onSubmit } = useLoginForm();

  return (
    <div className="container tm-mt-big tm-mb-big">
      <div className="row">
        <div className="col-12 mx-auto tm-login-col">
          <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
            <div className="row">
              <div className="col-12 text-center">
                <h2 className="tm-block-title mb-4">Welcome to Admin</h2>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                <form className="tm-login-form" onSubmit={onSubmit}>
                  <div className="form-group">
                    <div className="form-floating">
                      <input
                        {...register("login")}
                        type="text"
                        className={cx("form-control", !!errors.login && "is-invalid")}
                        id="loginInput"
                      />
                      <label htmlFor="loginInput">{errors.login ? errors.login.message : "Login"}</label>
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <div className="form-floating">
                      <input
                        {...register("password")}
                        type="password"
                        className={cx("form-control", !!errors.password && "is-invalid")}
                        id="passwordInput"
                      />
                      <label htmlFor="passwordInput">{errors.password ? errors.password.message : "Password"}</label>
                    </div>
                  </div>
                  <div className="form-group mt-4">
                    <button type="submit" className="btn btn-primary btn-block text-uppercase">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
