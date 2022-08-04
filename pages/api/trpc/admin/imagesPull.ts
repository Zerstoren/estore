import { z } from "zod";
import { createRouter } from "src/utils/network/createRouter";
import { ServiceAdminImagePull, ServiceAdminImageRemove } from "src/server/service/admin/imagesPull";

const ImagePullParams = z.object({
  pull_id: z.string(),
  add: z.array(
    z.object({
      file: z.string(),
    }),
  ),
});

const ImageRemoveParams = z.object({
  pull_id: z.string(),
  remove_id: z.array(z.string()),
});

export type ImagePullArguments = z.infer<typeof ImagePullParams>;
export type ImageRemoveArguments = z.infer<typeof ImageRemoveParams>;

export const adminImagesPullTrpc = createRouter()
  .mutation("push", {
    input: ImagePullParams,
    resolve: ({ input }) => ServiceAdminImagePull(input),
  })
  .mutation("remove", {
    input: ImageRemoveParams,
    resolve: ({ input }) => ServiceAdminImageRemove(input),
  });
