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
    const rows = await DbClient.selectFrom("groups").selectAll().execute();

    return rows;
  }

  /**
   * Insert a new row in group table
   * @param credentials name of the group
   */
  public async createGroup(credentials: NewGroup): Promise<Group> {
    const [rows] = await DbClient.insertInto("groups").values(credentials).returningAll().execute();

    return rows;
  }

  /**
   * Delete a row from the group table
   * @param credentials group_id of the group
   */
  public async deleteGroup(credentials: Pick<Group, "group_id">): Promise<void> {
    // check validity of the id
    await this.getGroupById(credentials);

    await DbClient.deleteFrom("groups").where("group_id", "=", credentials.group_id).execute();
  }

  /**
   * Gets the group of the specified id
   * @param credentials group_id to get
   * @returns The group
   */
  public async getGroupById(credentials: Pick<Group, "group_id">): Promise<Group> {
    const rows = await DbClient.selectFrom("groups")
      .selectAll()
      .where("group_id", "=", credentials.group_id)
      .executeTakeFirst();

    if (!rows) throw new NotFoundError({ message: ErrorMessageEnum.UNKNOWN_GROUP, code: 404 });

    return rows;
  }
}

export const groupRepository = new GroupRepository();
