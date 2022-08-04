import type { ImagePullArguments, ImageRemoveArguments } from "pages/api/trpc/admin/imagesPull";
import { getCollection } from "src/server/utils/mongodb";

export const ServiceAdminImagePull = async ({ pull_id, add }: ImagePullArguments) => {
  const collection = await getCollection("images");
};

export const ServiceAdminImageRemove = async ({ pull_id, remove_id }: ImageRemoveArguments) => {
  const collection = await getCollection("images");
};
