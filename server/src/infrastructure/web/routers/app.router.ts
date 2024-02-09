import { HealthRouterSingleton } from "./health/health.router";
import { StudentRouterSingleton } from "./student/student.router";
import RouterMaker from "./interfaces/router.abstract";
import SingletonWrapper from "../../../common/helpers/singleton-wrapper";

class AppRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this._router.use("/health/", HealthRouterSingleton.getRouter());
    this._router.use("/students/", StudentRouterSingleton.getRouter());
  }
}

export const AppRouterSingleton = SingletonWrapper.makeSingleton(new AppRouter()).getInstance();
