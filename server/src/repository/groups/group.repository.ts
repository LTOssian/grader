import SingletonWrapper from "../../common/helpers/singleton-wrapper";
import { DbClient } from "../../infrastructure/database/db-client";
import { Group } from "../../infrastructure/database/interfaces/groups-table.type";

class GroupRepository {
  public async getGroups(): Promise<Group[]> {
    const result = await DbClient.selectFrom("groups").selectAll().execute();

    return result;
  }
}

export const GroupRepositorySingleton = SingletonWrapper.makeSingleton(new GroupRepository()).getInstance();
