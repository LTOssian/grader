import SingletonWrapper from "../../common/helpers/singleton-wrapper";
import { DbClient } from "../../infrastructure/database/db-client";

class HealthRepository {
  public async getById(healthId: number): Promise<string | null> {
    const groups = await DbClient.selectFrom("groups").selectAll().execute();

    return `Hello World! ${healthId}, voici tous les groupes : ${groups.map((data) => data.name).join(" - ")}`;
  }
}

export const HealthRepositorySingleton = SingletonWrapper.makeSingleton(new HealthRepository()).getInstance();
