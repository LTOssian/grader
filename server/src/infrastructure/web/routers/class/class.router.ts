import { classController } from "../../../../controllers/classes/class.controller";
import RouterMaker from "../interfaces/router.abstract";
import SingletonWrapper from "../../../../common/helpers/singleton-wrapper";

class ClassRouter extends RouterMaker {
  public constructor() {
    super();
    this.initRoutes();
  }

  protected initRoutes(): void {
    this._router.get("/", classController.getAllClassesFromGroup);
    this._router.post("/", classController.postClass);
    this._router.delete("/:class_id", classController.deleteClass);
  }
}

export const classRouterSingleton = SingletonWrapper.makeSingleton(new ClassRouter()).getInstance();
