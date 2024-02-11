import { CustomValidator } from "./interfaces/validator";
import { NewGrades } from "../../infrastructure/database/interfaces/student-grades.type";
<<<<<<< HEAD
import { requiredCredentialsRule } from "./rules/required-credentials.rule";
=======
import { requiredCredentialsRule } from "./rules/required.rule";
>>>>>>> 46cddfc9511b27b2e6aa3c6f9404f7ed68b6a7b0
import { validReportRule } from "./rules/valid-grade.rule";
import SingletonWrapper from "../helpers/singleton-wrapper";

export const gradeValidatorSingleton = SingletonWrapper.makeSingleton(
  new CustomValidator<Omit<NewGrades, "grade">>()
).getInstance();
gradeValidatorSingleton.addRule((newGrade) => requiredCredentialsRule(newGrade));
gradeValidatorSingleton.addRule((newGrade) => validReportRule(newGrade, 0, 20));
