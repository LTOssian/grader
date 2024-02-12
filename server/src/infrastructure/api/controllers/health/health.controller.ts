import { ErrorMessageEnum } from "../../../../common/constants";
import { healthRepository } from "../../../../repositories/health/health.repository";
import { NextFunction, Request, Response } from "express";
import ValidationError from "../../../../common/errors/validation.error";

class HealthController {
  public constructor() {}

  // Get the health of the app
  public async getHealth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const healthyResult = await healthRepository.getById(Math.random());

      if (Math.random() > 0.5) throw new ValidationError({ message: ErrorMessageEnum.BAD_REQUEST, code: 404 });

      res.json(healthyResult);
    } catch (e) {
      next(e);
    }
  }
}

export const healthController = new HealthController();
