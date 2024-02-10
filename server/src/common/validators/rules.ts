import { TValidationResult } from "./validator";

/**
 * Checks that all given fields are truthy and non-empty
 * @param value object with the fields
 * @returns boolean isValid & list of missingKeys
 */
export const requiredCredentialsRule = (credentials: Record<string, any>): TValidationResult => {
  const missingKeys: string[] = [];

  // Loop over keys
  for (const key of Object.keys(credentials)) {
    const value = credentials[key];
    if (value === undefined || value === null || value === "") {
      missingKeys.push(key);
    }
  }

  if (missingKeys.length > 0) {
    return { isValid: false, errors: missingKeys };
  }

  return { isValid: true, errors: [] };
};
