import { ErrorMessageEnum } from "../constants";

interface IValidationError extends Error {
  code: number;
  validationErrors?: string[];
}

export default class ValidationError extends Error implements IValidationError {
  private static readonly _defaultCode: 400;
  public readonly code: number;
  public validationErrors?: string[] | undefined;

  public constructor(errorParams: { message?: string; code?: number }) {
    const { message, code } = errorParams;

    super(message || ErrorMessageEnum.INVALID_DATA);
    this.code = code || ValidationError._defaultCode;
  }
}
