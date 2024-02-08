import { GroupClassesTable } from "./group-classes.type";
import { GroupsTable } from "./groups-table.type";
import { StudentGradesTables } from "./student-grades.type";
import { StudentsTable } from "./students-table.type";

export interface Database {
  students: StudentsTable;
  groups: GroupsTable;
  student_grades: StudentGradesTables;
  group_classes: GroupClassesTable;
}
