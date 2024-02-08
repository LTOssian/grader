import { ErrorMessageEnum } from "../../common/constants";
import { HealthServiceSingleton } from "../../repository/health/health.repository";
import { NextFunction, Request, Response } from "express";
import SingletonWrapper from "../../common/helpers/singleton-wrapper";
import ValidationError from "../../common/errors/validation.error";

export class HealthController {
  public constructor() {}

  // Get the health of the app
  public async getHealth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const healthyResult = await HealthServiceSingleton.getById(Math.random());
      if (Math.random() > 0.5) throw new ValidationError({ message: ErrorMessageEnum.BAD_REQUEST, code: 404 });
      res.json(healthyResult);
    } catch (e) {
      console.log("error caught");
      next(e);
    }
  }
}

export const HealthControllerSingleton = SingletonWrapper.makeSingleton(new HealthController()).getInstance();
