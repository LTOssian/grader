import { Classes, NewClasses } from "../../infrastructure/database/interfaces/group-classes.type";
import { DbClient } from "../../infrastructure/database/db-client";
import { ErrorMessageEnum } from "../../common/constants";
import NotFoundError from "../../common/errors/not-found.error";

class ClassRepository {
  /**
   * Gets the classes of the specified group
   * @param credentials contains the group_id
   * @returns List of classes
   */
  public async getClassesFromGroup(credentials: Pick<Classes, "group_id">): Promise<Classes[]> {
    const rows = await DbClient.selectFrom("group_classes")
      .selectAll()
      .where("group_id", "=", credentials.group_id)
      .execute();

    return rows;
  }

  /**
   * Inserts a new class in the class table
   * @param credentials contains the name and the coeff of the class
   * @returns The class created
   */
  public async createClassFromGroup(credentials: NewClasses): Promise<Classes> {
    const [rows] = await DbClient.insertInto("group_classes").values(credentials).returningAll().execute();

    return rows;
  }

  /**
   * Delete the class with its id
   * @param credentials contains the class id
   */
  public async deleteClassFromGroup(credentials: Pick<Classes, "class_id" | "group_id">): Promise<void> {
    // check validity of the id
    await this.getClassById(credentials);

    await DbClient.deleteFrom("group_classes")
      .where("class_id", "=", credentials.class_id)
      .where("group_id", "=", credentials.group_id)
      .execute();
  }

  /**
   * Gets the class with its id
   * @param credentials contains the class id
   * @returns The class
   */
  public async getClassById(credentials: Pick<Classes, "class_id" | "group_id">): Promise<Classes> {
    const rows = await DbClient.selectFrom("group_classes")
      .selectAll()
      .where("class_id", "=", credentials.class_id)
      .where("group_id", "=", credentials.group_id)
      .executeTakeFirst();

    if (!rows) throw new NotFoundError({ message: ErrorMessageEnum.UNKNOWN_CLASS, code: 404 });

    return rows;
  }
}

export const classRepository = new ClassRepository();
