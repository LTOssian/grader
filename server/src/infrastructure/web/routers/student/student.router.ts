import { StudentControllerSingleton } from "../../../../controllers/students/student.controller";
import RouterMaker from "../interfaces/router.abstract";
import SingletonWrapper from "../../../../common/helpers/singleton-wrapper";

class StudentRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this._router.get("/:group_id", StudentControllerSingleton.getStudentsFromGroup);
  }
}

export const StudentRouterSingleton = SingletonWrapper.makeSingleton(new StudentRouter()).getInstance();
