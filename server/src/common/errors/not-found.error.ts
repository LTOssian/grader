import { ErrorMessageEnum } from "../constants";

interface INotFoundError extends Error {
  code: number;
}

export default class NotFoundError extends Error implements INotFoundError {
  private static readonly _defaultCode: 404;
  public readonly code: number;

  public constructor(errorParams: { message?: string; code?: number }) {
    const { message, code } = errorParams;

    super(message || ErrorMessageEnum.UNKNOWN_ID);
    this.code = code || NotFoundError._defaultCode;
  }
}
