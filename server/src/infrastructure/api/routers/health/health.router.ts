import { healthController } from "../../../../controllers/health/health.controller";
import RouterMaker from "../interfaces/router.abstract";
import SingletonWrapper from "../../../../common/helpers/singleton-wrapper";

class HealthRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this._router.get("/", healthController.getHealth);
  }
}

export const healthRouterSingleton = SingletonWrapper.makeSingleton(new HealthRouter()).getInstance();
