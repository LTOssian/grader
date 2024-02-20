import { StudentModel } from './student.model';

export interface GradeModel {
  student_grades_id: string;
  grade: number;
  created_at: string;
}

export interface GradeModel_Get
  extends Omit<StudentModel, 'student_id' | 'group_id'>,
    GradeModel {}

export interface GradeModel_Post
  extends Omit<GradeModel, 'grade' | 'created_at' | 'student_grades_id'> {
  student_id: string;
  report: TReport[];
}

export type TReport = {
  class: string;
  coefficient: number;
  grade: number;
};
