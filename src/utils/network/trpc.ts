import { createTRPCClient } from "@trpc/client";
// import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "pages/api/trpc/[trpc]";

export const trpc = createTRPCClient<AppRouter>({
  url: "http://localhost:3000/api/trpc",
});

// export const trpcReact = createReactQueryHooks<AppRouter>();
