import { DbClient } from "../../infrastructure/database/db-client";
import { ErrorMessageEnum } from "../../common/constants";
import { gradeCalculatorServiceSingleton } from "../../service/grade-calculator.service";
import { Grades, NewGrades } from "../../infrastructure/database/interfaces/student-grades.type";
import { Group } from "../../infrastructure/database/interfaces/groups-table.type";
import { IGeneratorCredentials } from "../../service/pdf-generator.service";
import NotFoundError from "../../common/errors/not-found.error";

class GradeRepository {
  /**
   * Gets the grades of the students of the specified group
   * @param credentials contains the group's id
   * @param limit number of entities wanted
   * @returns List of grades
   */
  public async getGradesFromGroup(credentials: Pick<Group, "group_id">, limit?: number): Promise<Partial<Grades>[]> {
    const query = DbClient.selectFrom("student_grades")
      .innerJoin("students", "students.student_id", "student_grades.student_id")
      .select(["student_grades_id", "students.firstname", "students.lastname", "students.email", "grade", "created_at"])
      .where("students.group_id", "=", credentials.group_id)
      .orderBy("created_at", "desc");

    const rows = limit ? await query.limit(limit).execute() : query.execute();

    return rows;
  }

  /**
   * Creates a grade for the student of the group
   * @param credentials contains the student_id, the grade and the report
   * @returns The grade created
   */
  public async createGradeFromStudent(credentials: Omit<NewGrades, "grade">): Promise<Omit<Grades, "report">> {
    const [rows] = await DbClient.insertInto("student_grades")
      .values({
        ...credentials,
        grade: gradeCalculatorServiceSingleton.calculateGrade({
          // very hacky but otherwise ts struggles,
          // issue due to express.json() setting which converts the report in an object
          // when it is supposed to be a stringified json
          report: JSON.parse(JSON.stringify(credentials.report)),
        }),
        report: JSON.stringify(credentials.report),
      })
      .returning(["student_grades_id", "student_id", "grade", "created_at"])
      .execute();

    return rows;
  }

  /**
   * Delete the specified grade
   * @param credentials contains the grade's id
   */
  public async deleteGrade(credentials: Pick<Grades, "student_grades_id">): Promise<void> {
    // check validity of the id
    await this.getGradeById(credentials);

    await DbClient.deleteFrom("student_grades")
      .where("student_grades_id", "=", credentials.student_grades_id)
      .execute();
  }

  /**
   * Gets the specified grade
   * @param credentials contains the grade's id
   * @returns The grade
   */
  public async getGradeById(credentials: Pick<Grades, "student_grades_id">): Promise<IGeneratorCredentials> {
    const rows = await DbClient.selectFrom("student_grades")
      .innerJoin("students", "students.student_id", "student_grades.student_id")
      .select(["students.firstname", "students.lastname", "students.email", "report", "grade", "created_at"])
      .where("student_grades_id", "=", credentials.student_grades_id)
      .executeTakeFirst();

    if (!rows) throw new NotFoundError({ message: ErrorMessageEnum.UNKNOWN_GRADE, code: 404 });

    return rows;
  }
}

export const gradeRepository = new GradeRepository();
