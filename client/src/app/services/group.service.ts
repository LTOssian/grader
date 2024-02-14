import { Injectable } from '@angular/core';
import { ApiServiceMaker } from './interface/api-service.abstract';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.getAllEntities<GroupModel[]>();
  }

  /**
   * Deletes a group with its id
   * @param groupId uuid of the group
   */
  public deleteGroupById(groupId: string) {
    return this.deleteEntityById(groupId);
  }

  /**
   * Creates a new group
   * @param body object containing the gorup name
   * @returns An error object or the new group object
   */
  public createGroupWithBody(body: Omit<GroupModel, 'group_id'>) {
    return this.createEntityWithBody<Omit<GroupModel, 'group_id'>, GroupModel>(
      body
    );
  }
}
