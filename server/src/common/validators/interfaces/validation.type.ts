export type TValidationResult = {
  isValid: boolean;
  errors: string[];
  message: string;
};

export type TValidationRule<T> = (value: T) => TValidationResult;
