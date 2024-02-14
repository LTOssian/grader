import { ErrorMessageEnum } from "../../constants";
import { TValidationResult } from "../interfaces/validation.type";

/**
 * Checks that all given fields are truthy and non-empty
 * @param credentials contains the fields
 * @returns boolean isValid & list of missingKeys
 */
export const requiredCredentialsRule = (credentials: Record<string, any>): TValidationResult => {
  const missingKeys: string[] = [];

  // Loop over keys and store every keys with no values
  for (const key of Object.keys(credentials)) {
    const value = credentials[key];
    if (value === undefined || value === null || value === "" || value <= 0) {
      missingKeys.push(key);
    }
  }

  if (missingKeys.length > 0) {
    return {
      isValid: false,
      errors: missingKeys,
      message: missingKeys.length === 1 ? ErrorMessageEnum.FIELD_REQUIRED : ErrorMessageEnum.MULTIPLE_FIELDS_REQUIRED,
    };
  }

  return { isValid: true, errors: [], message: "" };
};
