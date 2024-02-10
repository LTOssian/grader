import { groupRouterSingleton } from "./group/group.router";
import { healthRouterSingleton } from "./health/health.router";
import { studentRouterSingleton } from "./student/student.router";
import RouterMaker from "./interfaces/router.abstract";
import SingletonWrapper from "../../../common/helpers/singleton-wrapper";

class AppRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this._router.use("/health/", healthRouterSingleton.getRouter());
    this._router.use("/students/", studentRouterSingleton.getRouter());
    this._router.use("/groups", groupRouterSingleton.getRouter());
  }
}

export const AppRouterSingleton = SingletonWrapper.makeSingleton(new AppRouter()).getInstance();
