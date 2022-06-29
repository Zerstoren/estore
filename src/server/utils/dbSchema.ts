type AdminSchema = {
  name: string;
  permission: number;
  password: string;
};

export type DbSchema = {
  admin: AdminSchema;
};
