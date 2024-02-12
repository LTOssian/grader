import { Component, DestroyRef, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { GroupModel } from '../interfaces/group.model';
import { GroupService } from '../services/group.service';
import { AssetPath } from '../../assets/assets-path';

@Component({
  selector: 'app-sidebar-group',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './sidebar-group.component.html',
  styleUrl: './sidebar-group.component.scss',
})
export class SidebarGroupComponent {
  private groupService = inject(GroupService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  public groups = signal<GroupModel[]>([]);
  public groupListIsVisible = true;

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

  constructor() {
    this.groupService
      .getAllGroups()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((groupData) => this.groups.set(groupData.data));
  }

  navigateToGroup({ group_id }: Pick<GroupModel, 'group_id'>) {
    return this.router.navigateByUrl(`/group/${group_id}`);
  }

  navigateToHome() {
    return this.router.navigateByUrl('');
  }
}
