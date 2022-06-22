export const isPermitted = (userPermissions: number, permission: Permissions) => {
  // eslint-disable-next-line no-bitwise
  return userPermissions & permission;
};

export enum Permissions {
  ORDERS = 1,
  PRODUCTS = 2,
  USERS = 4,
  ADMINS = 8,
  SETTINGS = 16,
}
