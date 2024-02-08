import SingletonWrapper from "../../common/helpers/singleton-wrapper";

export class HealthService {
  public async getById(healthId: number): Promise<string | null> {
    return `Hello World! ${healthId}`;
  }
}

export const HealthServiceSingleton = SingletonWrapper.makeSingleton(new HealthService()).getInstance();
