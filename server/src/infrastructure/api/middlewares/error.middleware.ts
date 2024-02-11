import { NextFunction, Request, Response } from "express";
import NotFoundError from "../../../common/errors/not-found.error";
import ValidationError from "../../../common/errors/validation.error";

export const ErrorMiddleware = (
  err: ValidationError | NotFoundError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // console.info("error middleware is reached"); // debug
  res.setHeader("Content-Type", "application/json");

  if (err instanceof ValidationError || err instanceof NotFoundError) {
    res.status(err.code).json({
      error: err.message,
      ...(err instanceof ValidationError && {
        fields: err.validationErrors,
      }),
      data: null,
    });
    return;
  }

  res.status(400).json({
    error: err.message,
    data: null,
  });
};
