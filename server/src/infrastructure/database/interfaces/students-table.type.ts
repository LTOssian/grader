import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface StudentsTable {
  student_id: Generated<string>;
  group_id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export type Student = Selectable<StudentsTable>;
export type NewStudent = Insertable<StudentsTable>;
export type StudentUpdate = Updateable<StudentsTable>;
