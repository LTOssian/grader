import SingletonWrapper from "../../common/helpers/singleton-wrapper";
import { DbClient } from "../../infrastructure/database/db-client";

export class HealthService {
  public async getById(healthId: number): Promise<string | null> {
    const groups = await DbClient.selectFrom("groups").selectAll().execute();

    return `Hello World! ${healthId}, voici tous les groupes : ${groups.map((data) => data.name).join(" - ")}`;
  }
}

export const HealthServiceSingleton = SingletonWrapper.makeSingleton(new HealthService()).getInstance();
