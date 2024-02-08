import { ExpressAppSingleton } from "./src";

class App {
  private static readonly _PORT: string | number = process.env.PORT || 4001;

  public static async main(): Promise<void> {
    const expressApp = ExpressAppSingleton.build();

    expressApp.listen(this._PORT, () => {
      console.log(`Server listening`);
    });
  }
}

App.main();
