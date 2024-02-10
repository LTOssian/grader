import { NewGroup } from "../../infrastructure/database/interfaces/groups-table.type";
import { ErrorMessageEnum } from "../constants";
import SingletonWrapper from "../helpers/singleton-wrapper";
import { requiredRule } from "../validators/rules";
import { CustomValidator } from "../validators/validator";

interface IValidationError extends Error {
  code: number;
  validationErrors?: string[];
}

export default class ValidationError extends Error implements IValidationError {
  private static readonly _defaultCode: 400;
  public readonly code: number;
  public validationErrors?: string[] | undefined;

  public constructor(errorParams: { message?: string; code?: number; errors?: string[] }) {
    const { message, code, errors } = errorParams;

    super(message || ErrorMessageEnum.INVALID_DATA);
    this.code = code || ValidationError._defaultCode;
    this.validationErrors = errors;
  }
}
