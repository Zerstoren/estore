import { BaseException } from "src/server/exceptions/BaseException";

export class ValidationException<T extends Record<string, string>> extends BaseException {
  fields: Partial<T> | undefined;

  constructor(data: Partial<T>) {
    super("VALIDATION_ERROR");
    this.fields = data;
  }
}
