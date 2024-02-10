import { DbClient } from "../../infrastructure/database/db-client";
import { ErrorMessageEnum } from "../../common/constants";
import { Group, NewGroup } from "../../infrastructure/database/interfaces/groups-table.type";
import NotFoundError from "../../common/errors/not-found.error";

class GroupRepository {
  /**
   * Retrieves all the groups available in the db
   * @returns List of groups
   */
  public async getGroups(): Promise<Group[]> {
    const result = await DbClient.selectFrom("groups").selectAll().execute();

    return result;
  }

  /**
   * Insert a new row in group table
   * @param credentials name of the group
   */
  public async createGroup(credentials: NewGroup): Promise<Group> {
    const [result] = await DbClient.insertInto("groups").values(credentials).returning(["group_id", "name"]).execute();

    return result;
  }

  /**
   * Delete a row from the group table
   * @param credentials group_id of the group
   */
  public async deleteGroup(credentials: { group_id: string }): Promise<void> {
    const deletedRows = await DbClient.deleteFrom("groups").where("group_id", "=", credentials.group_id).execute();

    if (deletedRows.length === 0) throw new NotFoundError({ message: ErrorMessageEnum.UNKNOWN_ID, code: 404 });
  }
}

export const groupRepository = new GroupRepository();
