import { GroupClassesTable } from "./group-classes.type";
import { GroupsTable } from "./groups-table.type";
import { StudentGradesTables } from "./student-grades.type";
import { StudentsTable } from "./students-table.type";

export interface Database {
  student: StudentsTable;
  group: GroupsTable;
  studentGrades: StudentGradesTables;
  groupClasses: GroupClassesTable;
}
