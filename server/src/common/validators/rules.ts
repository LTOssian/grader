import { ErrorMessageEnum } from "../constants";
import { TValidationResult } from "./validator";

/**
 * Checks that the values exists
 * @param value
 * @returns Object with isValid and list of strings
 */
export const requiredRule = (value: any): TValidationResult => {
  if (value === undefined || value === null || value === "") {
    return { isValid: false, errors: [ErrorMessageEnum.FIELD_REQUIRED] };
  }

  return { isValid: true, errors: [] };
};