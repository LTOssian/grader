import { Injectable } from '@angular/core';
import { ApiServiceMaker } from './interface/api-service.abstract';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../interfaces/group.model';

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
    return this.getAllEntities<Group[]>();
  }
}
