import { ErrorMessageEnum } from "../../common/constants";
import { groupRepository } from "../../repository/groups/group.repository";
import { NextFunction, Request, Response } from "express";
import { studentRepository } from "../../repository/students/student.repository";
import { studentValidatorSingleton } from "../../common/validators/student.validator";
import ValidationError from "../../common/errors/validation.error";

class StudentController {
  public constructor() {}

  public async getStudentsFromGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { group_id } = req.params;

      // Validate that the group exists
      await groupRepository.getGroupById({ group_id });

      const students = await studentRepository.getStudentsFromGroup({ group_id });

      res.json({
        data: students,
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  }

  public async postStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const { group_id, firstname, lastname, email } = req.body;
      const { isValid, errors, message } = studentValidatorSingleton.validate({ group_id, firstname, lastname });

      if (!isValid)
        throw new ValidationError({
          message: message,
          code: 403,
          errors: errors,
        });

      // Validate that the group exists
      await groupRepository.getGroupById({ group_id });

      const student = await studentRepository.createStudentFromGroup({ group_id, firstname, lastname, email });

      res.status(201).json({
        data: student,
      });
    } catch (e) {
      next(e);
    }
  }

  public async getStudentFromGroupById(req: Request, res: Response, next: NextFunction) {
    try {
      const { group_id, student_id } = req.params;

      const { isValid, errors, message } = studentValidatorSingleton.validate({ group_id, student_id });

      if (!isValid)
        throw new ValidationError({
          message: ErrorMessageEnum.UNKNOWN_ID,
          code: 403,
          errors: errors,
        });

      // Validate that the group exists
      await groupRepository.getGroupById({ group_id });

      const student = await studentRepository.getStudentByID({ group_id, student_id });

      res.json({
        data: student,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const studentController = new StudentController();
