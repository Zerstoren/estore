import React, { useMemo } from "react";
import type { GetServerSideProps } from "next";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";

import { trpc } from "src/utils/network/trpc";
import { type AdminUser } from "src/admin/store/user/admin";
import { ServerSidePropsContext, SetServerSideProps } from "src/admin/context/serverSidePropsContext";
import { store } from "src/admin/store";
import { Routes } from "src/admin/routes";

type AdminProps = {
  user: AdminUser | null;
};

export default function Admin({ user }: AdminProps) {
  const values = useMemo(() => ({ user }), [user]);

  return (
    <ServerSidePropsContext.Provider value={values}>
      <Provider store={store}>
        <SetServerSideProps />
        <Helmet>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
            crossOrigin="anonymous"
          />

          <link rel="stylesheet" href="/css/fontawesome.min.css" />
          <link href="/css/base.admin.css" rel="stylesheet" />
        </Helmet>

        <Routes />
      </Provider>
    </ServerSidePropsContext.Provider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await trpc.query("admin.auth.getLoggedUser", { secretKey: req.cookies.auth });

  return {
    props: {
      user,
    },
  };
};
