import { NewGroup } from "../../infrastructure/database/interfaces/groups-table.type";
import { NewStudent } from "../../infrastructure/database/interfaces/students-table.type";
import { requiredCredentialsRule } from "./rules";
import SingletonWrapper from "../helpers/singleton-wrapper";

export type TValidationResult = {
  isValid: boolean;
  errors: string[];
};

export type TValidationRule<T> = (value: T) => TValidationResult;

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
    const TValidationResult: TValidationResult = { isValid: true, errors: [] };

    for (const rule of this.rules) {
      const result = rule(value);
      if (!result.isValid) {
        TValidationResult.isValid = false;
        TValidationResult.errors.push(...result.errors);
      }
    }

    return TValidationResult;
  }
}

export const groupValidatorSingleton = SingletonWrapper.makeSingleton(new CustomValidator<NewGroup>()).getInstance();
groupValidatorSingleton.addRule((newGroup) => requiredCredentialsRule(newGroup));

export const studentValidatorSingleton = SingletonWrapper.makeSingleton(
  new CustomValidator<Partial<NewStudent>>()
).getInstance();
studentValidatorSingleton.addRule((newStudent) => requiredCredentialsRule(newStudent));
