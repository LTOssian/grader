import { groupController } from "../../../../controllers/groups/group.controller";
import { studentController } from "../../../../controllers/students/student.controller";
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
    this._router.get("/:group_id/student/:student_id", studentController.getStudentFromGroupById);
  }
}

export const groupRouterSingleton = SingletonWrapper.makeSingleton(new GroupRouter()).getInstance();
