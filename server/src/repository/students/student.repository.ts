import SingletonWrapper from "../../common/helpers/singleton-wrapper";
import { DbClient } from "../../infrastructure/database/db-client";
import { Student } from "../../infrastructure/database/interfaces/students-table.type";

class StudentRepository {
  public async getStudentsFromGroup(groupId: string): Promise<Student[]> {
    const result = await DbClient.selectFrom("students").selectAll().where("students.group_id", "=", groupId).execute();
    return result;
  }
}

export const StudentRepositorySingleton = SingletonWrapper.makeSingleton(new StudentRepository()).getInstance();
