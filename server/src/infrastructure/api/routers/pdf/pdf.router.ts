import { NextFunction, Request, Response } from "express";
import RouterMaker from "../interfaces/router.abstract";
import { IGeneratorCredentials, pdfGeneratorServiceSingleton } from "../../../../service/pdf-generator.service";
import { gradeRepository } from "../../../../repository/grades/grade.repository";
import SingletonWrapper from "../../../../common/helpers/singleton-wrapper";
import { gradeDateFormattter } from "../../../../common/helpers/date-formatter";

class PdfRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this._router.get("/:grade_id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.setHeader("Content-Type", "application/pdf");

        const { grade_id } = req.params;
        const credentials: IGeneratorCredentials = await gradeRepository.getGradeById({ student_grades_id: grade_id });

        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${credentials.firstname}_${credentials.lastname}_Bulletin_${gradeDateFormattter({
            created_at: credentials.created_at,
          })}-.pdf`
        );

        pdfGeneratorServiceSingleton.generate(credentials, res);
      } catch (e) {
        next(e);
      }
    });
  }
}

export const pdfRouterSingleton = SingletonWrapper.makeSingleton(new PdfRouter()).getInstance();
