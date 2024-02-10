import { ErrorMessageEnum } from "../constants";

interface IValidationError extends Error {
  code: number;
  validationErrors?: string[];
}

export default class ValidationError extends Error implements IValidationError {
  private static readonly _defaultCode: 400;
  public readonly code: number;
  public validationErrors?: string[];

  public constructor(errorParams: { message?: string; code?: number; errors?: string[] }) {
    const { message, code, errors } = errorParams;

    super(message || ErrorMessageEnum.INVALID_DATA);
    this.code = code || ValidationError._defaultCode;
    this.validationErrors = errors;
  }
}
