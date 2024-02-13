import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Subject, switchMap } from 'rxjs';

import { AssetPath } from '../../assets/assets-path';
import { GroupModel } from '../interfaces/group.model';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-sidebar-group',
  standalone: true,
  imports: [JsonPipe, RouterLink],
  templateUrl: './sidebar-group.component.html',
  styleUrl: './sidebar-group.component.scss',
})
export class SidebarGroupComponent {
  private groupService = inject(GroupService);
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public groups = signal<GroupModel[]>([]);
  public groupListIsVisible = true;

  private getGroupsTrigger$ = new Subject<void>();

  public assetsStore = {
    trashSvg: {
      path: AssetPath.TRASH,
      alt: 'Icône de poubelle rouge',
    },
    arrowDownSvg: {
      path: AssetPath.ARROW_DOWN,
      alt: 'Icône de flèche vers le bas',
    },
    arrowUpSvg: {
      path: AssetPath.ARROW_UP,
      alt: 'Icône de flèche vers le haut',
    },
    logotypeSvg: {
      path: AssetPath.LOGOTYPE,
      alt: 'Logo typo',
    },
  };

  public constructor() {
    // Subject to trigger the get group method
    this.getGroupsTrigger$
      .pipe(
        switchMap(() => this.groupService.getAllGroups()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((groupData) => this.groups.set(groupData.data));

    // Initialize the subjects
    this.getGroupsTrigger$.next();
  }

  /**
   * Navigates to the group's page
   * @param param0 group_id key holding the group id
   */
  public async navigateToGroup({ group_id }: Pick<GroupModel, 'group_id'>) {
    await this.router.navigateByUrl(`/group/${group_id}`);
  }

  /**
   * Navigates to the home page
   */
  public navigateToHome() {
    return this.router.navigateByUrl('');
  }

  /**
   * Removes the group
   * @param param0 group_id key holding the group id
   */
  public removeGroupFromList({ group_id }: Pick<GroupModel, 'group_id'>) {
    this.groupService
      .deleteGroupById(group_id)
      .subscribe(() => {
        this.getGroupsTrigger$.next();
      })
      .add(() => this.navigateToHome());
  }
}
