import { NewGrades } from "../../../infrastructure/database/interfaces/student-grades.type";
import { ErrorMessageEnum } from "../../constants";
import { TValidationResult } from "../interfaces/validation.type";

/**
 * Check that the grades given are within the limits
 * @param credentials contains the grades creation fields
 * @param lowerLimit grade's lower limit
 * @param higherLimit grade's higher limit
 * @returns
 */
export const validReportRule = (
  credentials: Omit<NewGrades, "grade">,
  lowerLimit: number,
  higherLimit: number
): TValidationResult => {
  let outOfBoundsKeys: string[] = [];
  console.log(typeof credentials.report);

  (
    JSON.parse(credentials.report) as {
      class: string;
      coefficient: number;
      grade: number;
    }[]
  ).forEach((reportClass) => {
    if (
      reportClass.grade > higherLimit ||
      reportClass.grade < lowerLimit ||
      !reportClass.hasOwnProperty("grade") ||
      !reportClass.hasOwnProperty("coefficient")
    ) {
      outOfBoundsKeys.push(reportClass.class);
    }
  });

  return { isValid: outOfBoundsKeys.length === 0, errors: outOfBoundsKeys, message: ErrorMessageEnum.INVALID_DATA };
};
