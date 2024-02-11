import { classRouterSingleton } from "../class/class.router";
import { gradeRouterSingleton } from "../grade/grade.router";
import { groupController } from "../../../../controllers/groups/group.controller";
import { studentRouterSingleton } from "../student/student.router";
import RouterMaker from "../interfaces/router.abstract";
import SingletonWrapper from "../../../../common/helpers/singleton-wrapper";

class GroupRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this._router.get("/", groupController.getAllGroups);
    this._router.post("/", groupController.postGroup);
    this._router.delete("/:group_id", groupController.deleteGroup);

    this._router.use("/:group_id/students", studentRouterSingleton.getRouter());
    this._router.use("/:group_id/classes", classRouterSingleton.getRouter());
    this._router.use("/:group_id/grades/", gradeRouterSingleton.getRouter());
  }
}

export const groupRouterSingleton = SingletonWrapper.makeSingleton(new GroupRouter()).getInstance();
