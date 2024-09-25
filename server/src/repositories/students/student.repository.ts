import {Classes} from "../../infrastructure/database/interfaces/group-classes.type";
import {DbClient} from "../../infrastructure/database/db-client";
import {ErrorMessageEnum} from "../../common/constants";
import {NewStudent, Student, StudentUpdate} from "../../infrastructure/database/interfaces/students-table.type";
import NotFoundError from "../../common/errors/not-found.error";

class StudentRepository {
    public async updateStudentById(
        student_id: any,
        credentials: Omit<StudentUpdate, "student_id" | "group_id">
    ): Promise<void> {
        await DbClient.updateTable("students").set(credentials).where("student_id", "=", student_id).executeTakeFirst();
    }

    public async getStudentsFromGroup(credentials: Pick<Student, "group_id">): Promise<Student[]> {
        return await DbClient.selectFrom("students")
            .selectAll()
            .where("group_id", "=", credentials.group_id)
            .execute();
    }

    public async getStudentByID(credentials: Pick<Student, "student_id">, includeClass = false) {
        const baseQuery = DbClient.selectFrom("students")
            .innerJoin(
                (eb) =>
                    eb
                        .selectFrom("group_classes")
                        .select(["group_classes.coefficient", "group_classes.group_id", "group_classes.name"])
                        .as("subjects"),
                (join) => join.onRef("subjects.group_id", "=", "students.group_id")
            )
            .where("students.student_id", "=", credentials.student_id);

        const student = <Student & { classes: Omit<Classes, "class_id">[] }>(
            await baseQuery.selectAll("students").executeTakeFirst()
        );

        if (!student) throw new NotFoundError({message: ErrorMessageEnum.STUDENT_WITH_NO_CLASSES, code: 404});

        if (includeClass) student.classes = await baseQuery.selectAll("subjects").execute();

        return student;
    }

    public async createStudentFromGroup(credentials: NewStudent): Promise<Student> {
        const [rows] = await DbClient.insertInto("students").values(credentials).returningAll().execute();

        return rows;
    }

    public async deleteStudentFromGroup(credentials: Pick<Student, "student_id" | "group_id">): Promise<void> {
        // check validity of the id
        // await this.getStudentByID(credentials); // Method no longer valid for this use case, TODO Set up new validator

        await DbClient.deleteFrom("students")
            .where("student_id", "=", credentials.student_id)
            .where("group_id", "=", credentials.group_id)
            .execute();
    }
}

export const studentRepository = new StudentRepository();
