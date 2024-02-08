import { HealthControllerSingleton } from "../../../../controllers/health/health.controller";
import RouterMaker from "../interfaces/router.abstract";
import SingletonWrapper from "../../../../common/helpers/singleton-wrapper";

class HealthRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this._router.get("/", HealthControllerSingleton.getHealth);
  }
}

export const HealthRouterSingleton = SingletonWrapper.makeSingleton(new HealthRouter()).getInstance();
