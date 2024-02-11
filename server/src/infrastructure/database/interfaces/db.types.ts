import { Classes, ClassesTable } from "./group-classes.type";
import { Group, GroupsTable } from "./groups-table.type";
import { Student, StudentsTable } from "./students-table.type";
import { StudentGrades, StudentGradesTables } from "./student-grades.type";

export interface Database {
  students: StudentsTable;
  groups: GroupsTable;
  student_grades: StudentGradesTables;
  group_classes: ClassesTable;
}

export type Selectables = Group | Student | Classes | StudentGrades;
