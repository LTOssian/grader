import { CustomValidator } from "./interfaces/validator";
import { NewGrades } from "../../infrastructure/database/interfaces/student-grades.type";
import { requiredCredentialsRule } from "./rules/required.rule";
import { validReportRule } from "./rules/valid-grade.rule";
import SingletonWrapper from "../helpers/singleton-wrapper";

export const gradeValidatorSingleton = SingletonWrapper.makeSingleton(
  new CustomValidator<Omit<NewGrades, "grade">>()
).getInstance();
gradeValidatorSingleton.addRule((newGrade) => requiredCredentialsRule(newGrade));
gradeValidatorSingleton.addRule((newGrade) => validReportRule(newGrade, 0, 20));
