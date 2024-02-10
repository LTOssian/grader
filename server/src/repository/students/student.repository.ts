import { DbClient } from "../../infrastructure/database/db-client";
import { ErrorMessageEnum } from "../../common/constants";
import { NewStudent, Student } from "../../infrastructure/database/interfaces/students-table.type";
import NotFoundError from "../../common/errors/not-found.error";

class StudentRepository {
  public async getStudentsFromGroup(credentials: Pick<Student, "group_id">): Promise<Student[]> {
    const rows = await DbClient.selectFrom("students")
      .selectAll()
      .where("group_id", "=", credentials.group_id)
      .execute();
    return rows;
  }

  public async getStudentByID(credentials: Pick<Student, "group_id" | "student_id">) {
    const baseQuery = DbClient.selectFrom("students")
      .selectAll()
      .where("group_id", "=", credentials.group_id)
      .where("student_id", "=", credentials.student_id);

    const rows = await baseQuery.executeTakeFirst();

    if (!rows) throw new NotFoundError({ message: ErrorMessageEnum.UNKNOWN_STUDENT, code: 404 });

    return rows;
  }

  public async createStudentFromGroup(credentials: NewStudent): Promise<Student> {
    const [rows] = await DbClient.insertInto("students").values(credentials).returningAll().execute();

    return rows;
  }
}

export const studentRepository = new StudentRepository();
