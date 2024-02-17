import { Injectable } from '@angular/core';

import { ApiServiceMaker } from './interface/api-service.abstract';
import {
  GradeModel,
  GradeModel_Get,
  GradeModel_Post,
} from '../interfaces/grade.model';
import { GroupModel } from '../interfaces/group.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GradeService extends ApiServiceMaker {
  protected override apiEndpoint?: string;
  private parentEndpoint: string = '/groups';

  /**
   * Gets all the grades from the groups
   * @param param0 an object with group_id and a limit
   * @returns A list of the grades of the group
   */
  public getAllGradesFromGroup(
    { group_id }: Pick<GroupModel, 'group_id'>,
    params?: HttpParams
  ) {
    this.apiEndpoint = this.endPointBuilderService.buildEndpoint([
      { routeName: this.parentEndpoint, routeParam: group_id },
      { routeName: 'grades', routeParam: '' },
    ]);

    return this.getAllEntities<GradeModel_Get[]>(params);
  }

  /**
   * Deletes the grade from the group
   * @param param0 object containing grade and group id
   */
  public deleteGradeById({
    student_grades_id,
    group_id,
  }: {
    student_grades_id: GradeModel['student_grades_id'];
    group_id: GroupModel['group_id'];
  }) {
    this.apiEndpoint = this.endPointBuilderService.buildEndpoint([
      { routeName: this.parentEndpoint, routeParam: group_id },
      { routeName: 'grades', routeParam: student_grades_id },
    ]);

    return this.deleteEntityById();
  }

  public createGradeWithReportBody(body: GradeModel_Post, group_id: string) {
    this.apiEndpoint = this.endPointBuilderService.buildEndpoint([
      { routeName: this.parentEndpoint, routeParam: group_id },
      { routeName: 'grades', routeParam: '' },
    ]);

    return this.createEntityWithBody<GradeModel & { student_id: string }>(body);
  }
}
