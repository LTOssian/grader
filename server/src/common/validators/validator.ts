import { NewGroup } from "../../infrastructure/database/interfaces/groups-table.type";
import SingletonWrapper from "../helpers/singleton-wrapper";
import { requiredRule } from "./rules";

export type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

export type ValidationRule<T> = (value: T) => ValidationResult;

export class CustomValidator<T> {
  private rules: ValidationRule<T>[] = [];

  /**
   * Add a validation rule to validate against
   * @param rule callback method that handles validations
   */
  public addRule(rule: ValidationRule<T>): void {
    this.rules.push(rule);
  }

  /**
   * Validates the value against the rules added
   * @param value argument to validate against
   * @returns object with isValid boolean and list of errors
   */
  public validate(value: T): ValidationResult {
    const validationResult: ValidationResult = { isValid: true, errors: [] };

    for (const rule of this.rules) {
      const result = rule(value);
      if (!result.isValid) {
        validationResult.isValid = false;
        validationResult.errors.push(...result.errors);
      }
    }

    return validationResult;
  }
}

export const groupValidatorSingleton = SingletonWrapper.makeSingleton(new CustomValidator<NewGroup>()).getInstance();
groupValidatorSingleton.addRule((newGroup) => requiredRule(newGroup.name));
