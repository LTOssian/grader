import { CustomValidator } from "./interfaces/validator";
import { NewGroup } from "../../infrastructure/database/interfaces/groups-table.type";
import { requiredCredentialsRule } from "./rules/required.rule";
import SingletonWrapper from "../helpers/singleton-wrapper";

export const groupValidatorSingleton = SingletonWrapper.makeSingleton(new CustomValidator<NewGroup>()).getInstance();
groupValidatorSingleton.addRule((newGroup) => requiredCredentialsRule(newGroup));
