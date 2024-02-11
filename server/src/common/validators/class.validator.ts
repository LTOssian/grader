import { CustomValidator } from "./interfaces/validator";
import { NewClasses } from "../../infrastructure/database/interfaces/group-classes.type";
import { requiredCredentialsRule } from "./rules/required-credentials.rule";
import SingletonWrapper from "../helpers/singleton-wrapper";

export const classValidatorSingleton = SingletonWrapper.makeSingleton(new CustomValidator<NewClasses>()).getInstance();
classValidatorSingleton.addRule((newClass) => requiredCredentialsRule(newClass));
