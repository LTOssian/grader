import { gradeController } from "../../controllers/grades/grade.controller";
import { pdfController } from "../../controllers/pdf/pdf.controller";
import { studentController } from "../../controllers/students/student.controller";
import RouterMaker from "../interfaces/router.abstract";
import SingletonWrapper from "../../../../common/helpers/singleton-wrapper";

class PdfRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this._router.get("/:grade_id", pdfController.getPDF);
    this._router.get("/student/:student_id", studentController.getStudentFromGroupById);
    this._router.post("/grade/", gradeController.postGrade);
  }
}

export const pdfRouterSingleton = SingletonWrapper.makeSingleton(new PdfRouter()).getInstance();
