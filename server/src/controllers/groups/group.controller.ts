import { capitalizeFormatter } from "../../common/helpers/capitalize-formatter";
import { groupRepository } from "../../repository/groups/group.repository";
import { groupValidatorSingleton } from "../../common/validators/group.validator";
import { NextFunction, Request, Response } from "express";
import ValidationError from "../../common/errors/validation.error";

class GroupController {
  public constructor() {}

  public async getAllGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await groupRepository.getGroups();

      res.json({
        data: groups,
      });
    } catch (e) {
      next(e);
    }
  }

  public async postGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const { isValid, errors, message } = groupValidatorSingleton.validate({ name });
      if (!isValid)
        throw new ValidationError({
          message: message,
          code: 403,
          errors: errors,
        });

      const group = await groupRepository.createGroup({ name: capitalizeFormatter(name) });

      res.status(201).json({
        data: group,
      });
    } catch (e) {
      next(e);
    }
  }

  public async deleteGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { group_id } = req.params;

      await groupRepository.deleteGroup({ group_id });

      res.status(204).json();
    } catch (e) {
      next(e);
    }
  }
}

export const groupController = new GroupController();
