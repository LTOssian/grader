import { NextFunction, Request, Response } from "express";
import { gradeDateFormattter } from "../../common/helpers/date-formatter";
import { gradeRepository } from "../../repository/grades/grade.repository";
import { IGeneratorCredentials, PdfGeneratorService } from "../../service/pdf-generator.service";

class PdfController {
  public constructor() {}

  public async getPDF(req: Request, res: Response, next: NextFunction) {
    try {
      res.setHeader("Content-Type", "application/pdf");

      const { grade_id } = req.params;
      const version = req.query.version as "simple" | "complete" | undefined;

      const credentials: IGeneratorCredentials = await gradeRepository.getGradeById({ student_grades_id: grade_id });

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${credentials.firstname}_${credentials.lastname}_Bulletin_${gradeDateFormattter({
          created_at: credentials.created_at,
        })}-.pdf`
      );

      new PdfGeneratorService(credentials, res, version);
    } catch (e) {
      next(e);
    }
  }
}

export const pdfController = new PdfController();
