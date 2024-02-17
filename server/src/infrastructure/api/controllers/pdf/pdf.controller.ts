import { gradeDateFormattter } from "../../../../common/helpers/date-formatter";
import { gradeRepository } from "../../../../repositories/grades/grade.repository";
import { IGeneratorCredentials, PdfGeneratorService } from "../../../../service/pdf-generator.service";
import { NextFunction, Request, Response } from "express";

export type TPDFVersion = "simple" | "complete" | undefined;
class PdfController {
  public constructor() {}

  public async getPDF(req: Request, res: Response, next: NextFunction) {
    try {
      const { grade_id } = req.params;
      const version = req.query.version as TPDFVersion;

      const credentials: IGeneratorCredentials = await gradeRepository.getGradeById({ student_grades_id: grade_id });

      // set headers
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${credentials.firstname}_${credentials.lastname}_Bulletin_${gradeDateFormattter({
          created_at: credentials.created_at,
        })}.pdf`
      );
      res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

      new PdfGeneratorService(credentials, res, version);
    } catch (e) {
      next(e);
    }
  }
}

export const pdfController = new PdfController();
