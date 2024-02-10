import { Group, GroupsTable } from "./groups-table.type";
import { GroupClasses, GroupClassesTable } from "./group-classes.type";
import { Student, StudentsTable } from "./students-table.type";
import { StudentGrades, StudentGradesTables } from "./student-grades.type";

export interface Database {
  students: StudentsTable;
  groups: GroupsTable;
  student_grades: StudentGradesTables;
  group_classes: GroupClassesTable;
}

export type Selectables = Group | Student | GroupClasses | StudentGrades;
