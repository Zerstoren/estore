export const ValidationError = <T extends Record<string, string>>(fields: Partial<T>) => {
  return {
    error: {
      message: "VALIDATION",
      fields,
    },
  };
};
