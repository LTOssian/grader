import { Router } from "express";

export default abstract class RouterMaker {
  protected _router: Router;

  public constructor() {
    this._router = Router({ mergeParams: true });
  }

  public getRouter(): Router {
    return this._router;
  }

  protected abstract initRoutes(): void;
}
