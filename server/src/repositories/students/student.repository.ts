import { DbClient } from "../../infrastructure/database/db-client";
import { ErrorMessageEnum } from "../../common/constants";
import { NewStudent, Student } from "../../infrastructure/database/interfaces/students-table.type";
import NotFoundError from "../../common/errors/not-found.error";
import { Grades } from "../../infrastructure/database/interfaces/student-grades.type";
import { Classes } from "../../infrastructure/database/interfaces/group-classes.type";

class StudentRepository {
  public async getStudentsFromGroup(credentials: Pick<Student, "group_id">): Promise<Student[]> {
    const rows = await DbClient.selectFrom("students")
      .selectAll()
      .where("group_id", "=", credentials.group_id)
      .execute();

    return rows;
  }

  public async getStudentByID(credentials: Pick<Student, "group_id" | "student_id">, includeClass = false) {
    const baseQuery = DbClient.selectFrom("students")
      .innerJoin(
        (eb) =>
          eb
            .selectFrom("group_classes")
            .select(["group_classes.coefficient", "group_classes.group_id", "group_classes.name"])
            .where("group_classes.group_id", "=", credentials.group_id)
            .as("subjects"),
        (join) => join.onRef("subjects.group_id", "=", "students.group_id")
      )
      .where("students.group_id", "=", credentials.group_id)
      .where("students.student_id", "=", credentials.student_id);

    const student = <Student & { classes: Omit<Classes, "class_id">[] }>(
      await baseQuery.selectAll("students").executeTakeFirst()
    );

    if (!student) throw new NotFoundError({ message: ErrorMessageEnum.UNKNOWN_STUDENT, code: 404 });

    if (includeClass) student.classes = await baseQuery.selectAll("subjects").execute();

    return student;
  }

  public async createStudentFromGroup(credentials: NewStudent): Promise<Student> {
    const [rows] = await DbClient.insertInto("students").values(credentials).returningAll().execute();

    return rows;
  }

  public async deleteStudentFromGroup(credentials: Pick<Student, "student_id" | "group_id">): Promise<void> {
    // check validity of the id
    await this.getStudentByID(credentials);

    await DbClient.deleteFrom("students")
      .where("student_id", "=", credentials.student_id)
      .where("group_id", "=", credentials.group_id)
      .execute();
  }
}

export const studentRepository = new StudentRepository();
