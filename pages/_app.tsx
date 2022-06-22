import React from "react";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { BrowserRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { AppRouter } from "./api/trpc/[trpc]";

const App: AppType = ({ Component, pageProps, router }) => {
  if (typeof window === "undefined") {
    return (
      <StaticRouter location={router.asPath}>
        <Component {...pageProps} />
      </StaticRouter>
    );
  }

  return (
    <BrowserRouter>
      <Component {...pageProps} />
    </BrowserRouter>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
    };
  },

  ssr: true,
})(App);
