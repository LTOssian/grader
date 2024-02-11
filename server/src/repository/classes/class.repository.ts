import { ErrorMessageEnum } from "../../common/constants";
import NotFoundError from "../../common/errors/not-found.error";
import { DbClient } from "../../infrastructure/database/db-client";
import { Classes, NewClasses } from "../../infrastructure/database/interfaces/group-classes.type";

class ClassRepository {
  public async getClassesFromGroup(credentials: Pick<Classes, "group_id">): Promise<Classes[]> {
    const rows = await DbClient.selectFrom("group_classes")
      .selectAll()
      .where("group_id", "=", credentials.group_id)
      .execute();

    return rows;
  }

  public async createClassFromGroup(credentials: NewClasses): Promise<Classes> {
    const [rows] = await DbClient.insertInto("group_classes").values(credentials).returningAll().execute();

    return rows;
  }

  public async deleteClassFromGroup(credentials: Pick<Classes, "class_id">): Promise<void> {
    // check validity of the id
    await this.getClassById(credentials);

    await DbClient.deleteFrom("group_classes").where("class_id", "=", credentials.class_id).execute();
  }

  public async getClassById(credentials: Pick<Classes, "class_id">): Promise<Classes> {
    const rows = await DbClient.selectFrom("group_classes")
      .selectAll()
      .where("class_id", "=", credentials.class_id)
      .executeTakeFirst();

    if (!rows) throw new NotFoundError({ message: ErrorMessageEnum.UNKNOWN_CLASS, code: 404 });

    return rows;
  }
}

export const classRepository = new ClassRepository();
