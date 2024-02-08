class SingletonWrapper {
  private constructor() {}

  public static makeSingleton<T>(instance: T) {
    class Singleton {
      private static _instance: T;

      private constructor() {}

      public static getInstance(): T {
        if (!Singleton._instance) {
          Singleton._instance = instance;
        }

        return Singleton._instance;
      }
    }

    return Singleton;
  }
}

export default SingletonWrapper;
