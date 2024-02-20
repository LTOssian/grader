import { studentController } from "../../controllers/students/student.controller";
import RouterMaker from "../interfaces/router.abstract";
import SingletonWrapper from "../../../../common/helpers/singleton-wrapper";

class StudentRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this._router.get("/", studentController.getStudentsFromGroup);
    this._router.post("/", studentController.postStudent);
    this._router.delete("/:student_id", studentController.deleteStudentFromGroup);
  }
}

export const studentRouterSingleton = SingletonWrapper.makeSingleton(new StudentRouter()).getInstance();
