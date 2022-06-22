export class ValidationException<T extends Record<string, string>> extends Error {
  fields: Partial<T> | undefined;

  constructor(data: Partial<T>) {
    super("VALIDATION_ERROR1");
    this.fields = data;
  }
}
