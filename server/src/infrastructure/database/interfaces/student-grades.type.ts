import { ColumnType, Generated, Insertable, JSONColumnType, Selectable, Updateable } from "kysely";

export interface StudentGradesTables {
  student_grades_id: Generated<string>;
  student_id: string;
  report: JSONColumnType<
    {
      class: string;
      coefficient: number;
      grade: number;
    }[]
  >;
  grade: number;
  created_at: Generated<ColumnType<Date, never, never>>;
}

export type StudentGrades = Selectable<StudentGradesTables>;
export type NewStudentGrades = Insertable<StudentGradesTables>;
export type StudentGradesUpdate = Updateable<StudentGradesTables>;
