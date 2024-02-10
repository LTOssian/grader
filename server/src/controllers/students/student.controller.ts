import { NextFunction, Request, Response } from "express";
import { studentRepository } from "../../repository/students/student.repository";

class StudentController {
  public constructor() {}

  public async getStudentsFromGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { group_id } = req.params;

      // validate group

      const students = await studentRepository.getStudentsFromGroup(group_id);

      res.json({
        data: students,
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  }

  public async createStudent(req: Request, res: Response, next: NextFunction) {}
}

export const studentController = new StudentController();
