import SingletonWrapper from "../../../common/helpers/singleton-wrapper";
import { HealthRouterSingleton } from "./health/health.router";
import RouterMaker from "./interfaces/router.abstract";

class AppRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this._router.use("/health/", HealthRouterSingleton.getRouter());
  }
}

export const AppRouterSingleton = SingletonWrapper.makeSingleton(new AppRouter()).getInstance();
