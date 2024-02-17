import { Injectable } from '@angular/core';

import { ApiServiceMaker } from './interface/api-service.abstract';
import { StudentModel } from '../interfaces/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService extends ApiServiceMaker {
  protected override apiEndpoint?: string;
  private parentEndpoint: string = '/groups';

  /**
   * Gets all the student available in the group
   * @param param0 an object with group_id
   * @returns A list of the students of the group
   */
  public getAllStudentsFromGroup({ group_id }: Pick<StudentModel, 'group_id'>) {
    this.apiEndpoint = this.endPointBuilderService.buildEndpoint([
      { routeName: this.parentEndpoint, routeParam: group_id },
      { routeName: 'students', routeParam: '' },
    ]);
    return this.getAllEntities<StudentModel[]>();
  }
  /**
   * Deletes the specified student
   * @param param0 object containing group_id and student_id
   */
  public deleteStudentById({
    group_id,
    student_id,
  }: {
    group_id: StudentModel['group_id'];
    student_id: StudentModel['student_id'];
  }) {
    this.apiEndpoint = this.endPointBuilderService.buildEndpoint([
      { routeName: this.parentEndpoint, routeParam: group_id },
      { routeName: 'students', routeParam: student_id },
    ]);

    return this.deleteEntityById();
  }

  /**
   * Creates a new student
   * @param body object containing the student firstname, lastname and email adress
   * @returns An error object or the new student object
   */
  public createStudentWithBody(body: Omit<StudentModel, 'student_id'>) {
    this.apiEndpoint = this.endPointBuilderService.buildEndpoint([
      { routeName: this.parentEndpoint, routeParam: body.group_id },
      { routeName: 'students', routeParam: '' },
    ]);

    return this.createEntityWithBody<
      Omit<StudentModel, 'student_id'>,
      StudentModel
    >(body);
  }
}
