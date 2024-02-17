import { ApiServiceMaker } from './interface/api-service.abstract';
import { ClassModel } from '../interfaces/class.model';
import { GroupModel } from '../interfaces/group.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClassService extends ApiServiceMaker {
  protected override apiEndpoint?: string;
  private parentEndpoint: string = '/groups';

  /**
   * Gets all the classes available in the group
   * @param param0 an object with group_id
   * @returns A list of the classes of the group
   */
  public getAllClassesFromGroup({ group_id }: Pick<GroupModel, 'group_id'>) {
    this.apiEndpoint = this.endPointBuilderService.buildEndpoint([
      { routeName: this.parentEndpoint, routeParam: group_id },
      { routeName: '/classes', routeParam: '' },
    ]);

    return this.getAllEntities<ClassModel[]>();
  }

  /**
   * Deletes a class with its id
   * @param param0 object with group_id and class_id
   */
  public deleteClassById({
    group_id,
    class_id,
  }: {
    group_id: GroupModel['group_id'];
    class_id: ClassModel['class_id'];
  }) {
    this.apiEndpoint = this.endPointBuilderService.buildEndpoint([
      { routeName: this.parentEndpoint, routeParam: group_id },
      { routeName: '/classes', routeParam: class_id },
    ]);

    return this.deleteEntityById();
  }

  /**
   * Creates a new class
   * @param body object containing the class name and coefficient
   * @returns An error object or the new class object
   */
  public createClassWithBody(body: Omit<ClassModel, 'class_id'>) {
    this.apiEndpoint = this.endPointBuilderService.buildEndpoint([
      { routeName: this.parentEndpoint, routeParam: body.group_id },
      { routeName: '/classes', routeParam: '' },
    ]);

    return this.createEntityWithBody<Omit<ClassModel, 'class_id'>, ClassModel>(
      body
    );
  }
}
