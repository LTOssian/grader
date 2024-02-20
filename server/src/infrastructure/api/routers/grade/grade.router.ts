import { gradeController } from "../../controllers/grades/grade.controller";
import RouterMaker from "../interfaces/router.abstract";
import SingletonWrapper from "../../../../common/helpers/singleton-wrapper";

class GradeRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this._router.get("/", gradeController.getAllGrades);
    this._router.delete("/:student_grades_id", gradeController.deleteGrade);
  }
}

export const gradeRouterSingleton = SingletonWrapper.makeSingleton(new GradeRouter()).getInstance();
