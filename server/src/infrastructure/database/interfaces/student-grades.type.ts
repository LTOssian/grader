import { ColumnType, Generated, Insertable, JSONColumnType, Selectable, Updateable } from "kysely";

export interface GradesTables {
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
  created_at: Generated<Date>;
}

export type Grades = Selectable<GradesTables>;
export type NewGrades = Insertable<GradesTables>;
export type GradesUpdate = Updateable<GradesTables>;
