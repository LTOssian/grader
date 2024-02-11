import { TValidationRule, TValidationResult } from "./validation.type";

export class CustomValidator<T> {
  private rules: TValidationRule<T>[] = [];

  /**
   * Add a validation rule to validate against
   * @param rule callback method that handles validations
   */
  public addRule(rule: TValidationRule<T>): void {
    this.rules.push(rule);
  }

  /**
   * Validates the value against the rules added
   * @param value argument to validate against
   * @returns object with isValid boolean and list of errors
   */
  public validate(value: T): TValidationResult {
    const TValidationResult: TValidationResult = { isValid: true, errors: [], message: "" };

    for (const rule of this.rules) {
      const result = rule(value);
      console.log(result);
      if (!result.isValid) {
        TValidationResult.isValid = false;
        TValidationResult.errors.push(...result.errors);
        TValidationResult.message = result.message;
      }
    }

    return TValidationResult;
  }
}
