import { ErrorMessageEnum } from "../../common/constants";
import NotFoundError from "../../common/errors/not-found.error";
import { DbClient } from "../../infrastructure/database/db-client";
import { Student } from "../../infrastructure/database/interfaces/students-table.type";

class StudentRepository {
  public async getStudentsFromGroup(credentials: Pick<Student, "group_id">): Promise<Student[]> {
    const rows = await DbClient.selectFrom("students")
      .selectAll()
      .where("group_id", "=", credentials.group_id)
      .execute();
    return rows;
  }

  public async getStudentsByID(credentials: Partial<Pick<Student, "group_id" | "student_id">>) {
    const baseQuery = await DbClient.selectFrom("students").selectAll();

    if (credentials.group_id) baseQuery.where("group_id", "=", credentials.group_id);
    if (credentials.student_id) baseQuery.where("student_id", "=", credentials.student_id);

    const rows = baseQuery.executeTakeFirst();

    if (!rows) throw new NotFoundError({ message: ErrorMessageEnum.UNKNOWN_ID, code: 404 });

    return rows;
  }
}

export const studentRepository = new StudentRepository();
