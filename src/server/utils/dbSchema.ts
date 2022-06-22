type AdminSchema = {
  name: string;
  permission: number;
};

export type DbSchema = {
  admin: AdminSchema;
};
