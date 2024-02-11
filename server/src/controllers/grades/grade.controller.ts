import { ErrorMessageEnum } from "../../common/constants";
import { gradeRepository } from "../../repository/grades/grade.repository";
import { gradeValidatorSingleton } from "../../common/validators/grade.validator";
import { groupRepository } from "../../repository/groups/group.repository";
import { NextFunction, Request, Response } from "express";
import { studentRepository } from "../../repository/students/student.repository";
import ValidationError from "../../common/errors/validation.error";

class GradeController {
  public constructor() {}

  public async getAllGrades(req: Request, res: Response, next: NextFunction) {
    try {
      const { group_id } = req.params;

      // Validate that the group exists
      await groupRepository.getGroupById({ group_id });

      const grades = await gradeRepository.getGradesFromGroup({ group_id });

      res.json({
        data: grades,
      });
    } catch (e) {
      next(e);
    }
  }

  public async postGrade(req: Request, res: Response, next: NextFunction) {
    try {
      const { group_id } = req.params;
      const { student_id, report } = req.body;
      const { isValid, errors, message } = gradeValidatorSingleton.validate({
        student_id,
        report: JSON.stringify(report),
      });

      if (!isValid)
        throw new ValidationError({
          message: message,
          code: 403,
          errors: errors,
        });

      // Validate that the student exists
      await studentRepository.getStudentByID({ group_id, student_id });

      const createdGrade = await gradeRepository.createGradeFromStudent({ student_id, report });

      res.status(201).json({
        data: createdGrade,
      });
    } catch (e) {
      next(e);
    }
  }

  public async deleteGrade(req: Request, res: Response, next: NextFunction) {
    try {
      const { student_grades_id } = req.params;

      await gradeRepository.deleteGrade({ student_grades_id });

      res.status(204).json();
    } catch (e) {
      next(e);
    }
  }
}

export const gradeController = new GradeController();
