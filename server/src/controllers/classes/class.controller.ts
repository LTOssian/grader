import { classRepository } from "../../repository/classes/class.repository";
import { classValidatorSingleton } from "../../common/validators/class.validator";
import { ErrorMessageEnum } from "../../common/constants";
import { groupRepository } from "../../repository/groups/group.repository";
import { NextFunction, Request, Response } from "express";
import ValidationError from "../../common/errors/validation.error";

class ClassController {
  public constructor() {}

  public async getAllClassesFromGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { group_id } = req.params;

      // Validate that the group exists
      await groupRepository.getGroupById({ group_id });

      const classes = await classRepository.getClassesFromGroup({ group_id });

      res.json({
        data: classes,
      });
    } catch (e) {
      next(e);
    }
  }

  public async postClass(req: Request, res: Response, next: NextFunction) {
    try {
      const { group_id, name, coefficient } = req.params;
      const { isValid, errors } = classValidatorSingleton.validate({
        group_id,
        name,
        coefficient: Number(coefficient),
      });

      if (!isValid)
        throw new ValidationError({
          message: ErrorMessageEnum.FIELD_REQUIRED,
          code: 403,
          errors: errors,
        });

      // Validate that the group exists
      await groupRepository.getGroupById({ group_id });

      const createdClass = await classRepository.createClassFromGroup({
        group_id,
        name,
        coefficient: Number(coefficient),
      });

      res.status(201).json({
        data: createdClass,
      });
    } catch (e) {
      next(e);
    }
  }

  public async deleteClass(req: Request, res: Response, next: NextFunction) {
    try {
      const { class_id } = req.params;

      await classRepository.deleteClassFromGroup({ class_id });

      res.status(204).json();
    } catch (e) {
      next(e);
    }
  }
}

export const classController = new ClassController();
