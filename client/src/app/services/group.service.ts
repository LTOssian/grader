import { Injectable } from '@angular/core';

import { ApiServiceMaker } from './interface/api-service.abstract';
import { GroupModel } from '../interfaces/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService extends ApiServiceMaker {
  protected override apiEndpoint: string = '/groups';

  /**
   * Gets all the groups available to the user
   * @returns A list of the groups
   */
  public getAllGroups() {
    this.apiEndpoint = this.endPointBuilderService.buildEndpoint([
      { routeName: 'groups', routeParam: '' },
    ]);

    return this.getAllEntities<GroupModel[]>();
  }

  /**
   * Deletes a group with its id
   * @param groupId uuid of the group
   */
  public deleteGroupById({ group_id }: Pick<GroupModel, 'group_id'>) {
    this.apiEndpoint = this.endPointBuilderService.buildEndpoint([
      { routeName: 'groups', routeParam: group_id },
    ]);

    return this.deleteEntityById();
  }

  /**
   * Creates a new group
   * @param body object containing the gorup name
   * @returns An error object or the new group object
   */
  public createGroupWithBody(body: Omit<GroupModel, 'group_id'>) {
    this.apiEndpoint = this.endPointBuilderService.buildEndpoint([
      { routeName: 'groups', routeParam: '' },
    ]);

    return this.createEntityWithBody<Omit<GroupModel, 'group_id'>, GroupModel>(
      body
    );
  }
}
