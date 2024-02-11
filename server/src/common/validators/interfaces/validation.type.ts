export type TValidationResult = {
  isValid: boolean;
  errors: string[];
};

export type TValidationRule<T> = (value: T) => TValidationResult;
