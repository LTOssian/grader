import { ErrorMessageEnum } from "../constants";
import { ValidationResult } from "./validator";

/**
 * CHecks that the values exists
 * @param value
 * @returns Object with isValid and list of strings
 */
export const requiredRule = (value: any): ValidationResult => {
  if (value === undefined || value === null || value === "") {
    return { isValid: false, errors: [ErrorMessageEnum.FIELD_REQUIRED] };
  }

  return { isValid: true, errors: [] };
};
