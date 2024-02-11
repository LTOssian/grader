import { CustomValidator } from "./interfaces/validator";
import { NewStudent } from "../../infrastructure/database/interfaces/students-table.type";
import { requiredCredentialsRule } from "./rules";
import SingletonWrapper from "../helpers/singleton-wrapper";

export const studentValidatorSingleton = SingletonWrapper.makeSingleton(
  new CustomValidator<Partial<NewStudent>>()
).getInstance();
studentValidatorSingleton.addRule((newStudent) => requiredCredentialsRule(newStudent));
