import React, { FC, PropsWithChildren } from "react";
import { HeaderMenu } from "src/admin/components/HeaderMenu";

type BaseLayoutProps = {
  isLogin?: boolean;
};

export const BaseLayout: FC<PropsWithChildren<BaseLayoutProps>> = ({ children, isLogin = true }) => {
  if (!isLogin) {
    return <div>{children}</div>;
  }

  return (
    <div>
      <HeaderMenu />
      <div className="container mt-5">
        <div className="row tm-content-row">
          <div className="col-12 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
