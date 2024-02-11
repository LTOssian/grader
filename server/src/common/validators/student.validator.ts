import { CustomValidator } from "./interfaces/validator";
import { NewStudent } from "../../infrastructure/database/interfaces/students-table.type";
<<<<<<< HEAD
import { requiredCredentialsRule } from "./rules/required-credentials.rule";
=======
import { requiredCredentialsRule } from "./rules/required.rule";
>>>>>>> 46cddfc9511b27b2e6aa3c6f9404f7ed68b6a7b0
import SingletonWrapper from "../helpers/singleton-wrapper";

export const studentValidatorSingleton = SingletonWrapper.makeSingleton(
  new CustomValidator<Partial<NewStudent>>()
).getInstance();
studentValidatorSingleton.addRule((newStudent) => requiredCredentialsRule(newStudent));
