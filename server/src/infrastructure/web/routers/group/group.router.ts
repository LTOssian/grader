import SingletonWrapper from "../../../../common/helpers/singleton-wrapper";
import { groupController } from "../../../../controllers/groups/group.controller";
import RouterMaker from "../interfaces/router.abstract";

class GroupRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this._router.get("/", groupController.getAllGroup);
    this._router.post("/", groupController.postGroup);
    this._router.delete("/:group_id", groupController.deleteGroup);
  }
}

export const groupRouterSingleton = SingletonWrapper.makeSingleton(new GroupRouter()).getInstance();
