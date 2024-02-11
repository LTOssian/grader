import { CustomValidator } from "./interfaces/validator";
import { NewGrades } from "../../infrastructure/database/interfaces/student-grades.type";
import { requiredCredentialsRule } from "./rules";
import SingletonWrapper from "../helpers/singleton-wrapper";

export const gradeValidatorSingleton = SingletonWrapper.makeSingleton(
  new CustomValidator<Omit<NewGrades, "grade">>()
).getInstance();
gradeValidatorSingleton.addRule((newGrade) => requiredCredentialsRule(newGrade));
