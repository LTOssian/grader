import { AppRouterSingleton } from "./infrastructure/api/routers/app.router";
import { ErrorMiddleware } from "./infrastructure/api/middlewares/error.middleware";
import cors from "cors";
import express, { Express } from "express";
import morgan from "morgan";
import SingletonWrapper from "./common/helpers/singleton-wrapper";

class ExpressApp {
  private readonly _app: Express;
  private _appIsInitialized: boolean = false;

  public constructor() {
    this._app = express();
  }

  public build(): Express {
    this.initializeApp();
    return this._app;
  }

  public initializeApp(): void {
    if (!this._appIsInitialized) {
      this.setAppSettings();
      this.setDevMiddlewares();
      this.setAppRouter();
      this.setErrorMiddlewares();
    }

    this._appIsInitialized = true;
  }

  private setAppSettings(): void {
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(
      cors({
        origin: process.env.CLIENT_ORIGIN,
      })
    );
  }

  private setDevMiddlewares(): void {
    this._app.use(morgan("tiny"));
  }

  private setAppRouter(): void {
    this._app.use("/api/", AppRouterSingleton.getRouter());
  }

  private setErrorMiddlewares(): void {
    this._app.use(ErrorMiddleware);
  }
}

export const ExpressAppSingleton = SingletonWrapper.makeSingleton(new ExpressApp()).getInstance();
