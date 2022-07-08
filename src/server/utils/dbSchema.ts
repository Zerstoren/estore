import type { ObjectId } from "mongodb";

export type AdminUsersSchema = {
  name: string;
  permission: number;
  password: string;
};

export type CategoriesSchema = {
  name: string;
  url: string;
  title: string;
  keywords: string;
  description: string;
  parent_id: ObjectId | null;
};

export type DbSchema = {
  adminUsers: AdminUsersSchema;
  categories: CategoriesSchema;
};
