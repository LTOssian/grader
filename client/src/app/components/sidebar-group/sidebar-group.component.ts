import { Component, DestroyRef, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Subject, switchMap } from 'rxjs';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';

import { AssetPath } from '../../../assets/assets-path';
import { BuildFormByModalFormTypeService } from '../../services/build-form-by-modal-form-type.service';
import { GroupModel } from '../../interfaces/group.model';
import { GroupService } from '../../services/group.service';
import { ModalCreateFormComponent } from '../modal-create-form/modal-create-form.component';
import {
  IModalRef,
  ModalFailMessage,
  ModalSuccesMessage,
} from '../../interfaces/form.model';

@Component({
  selector: 'app-sidebar-group',
  standalone: true,
  imports: [JsonPipe, MdbModalModule, RouterLink],
  templateUrl: './sidebar-group.component.html',
  styleUrl: './sidebar-group.component.scss',
})
export class SidebarGroupComponent {
  private buildModalFormService = inject(BuildFormByModalFormTypeService);
  private destroyRef = inject(DestroyRef);
  private groupService = inject(GroupService);
  private modalService = inject(MdbModalService);
  private router = inject(Router);

  public groups = signal<GroupModel[]>([]);
  public groupListIsVisible = true;
  private getGroupsTrigger$ = new Subject<void>();

  private modalCreateRef: MdbModalRef<ModalCreateFormComponent> | null = null;

  public assetsStore = {
    trashSvg: {
      path: AssetPath.TRASH,
      alt: 'Icône de poubelle',
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
      .deleteGroupById({ group_id })
      .subscribe(() => {
        this.getGroupsTrigger$.next();
      })
      .add(() => this.navigateToHome());
  }

  /**
   * Opens a modal and listens for its close state to perform a new fetch if it is successful
   */
  public openModalForm() {
    this.modalCreateRef = this.modalService.open<
      ModalCreateFormComponent,
      Omit<IModalRef, 'subtitle'>
    >(ModalCreateFormComponent, {
      data: {
        title: 'Ajoutez un groupe',
        labelsByInput: {
          name: 'Nom',
        },
        placeholdersByInput: {
          name: 'Entrez le nom du groupe',
        },
        entityToCreate: 'group',
        modalFormGroup:
          this.buildModalFormService.buildFormByModalFormType('group'),
      },
    });

    this.modalCreateRef.onClose.subscribe(
      (message: ModalFailMessage | ModalSuccesMessage) => {
        if (!message.isSuccess) return;
        console.info(message.message);
        this.getGroupsTrigger$.next();
      }
    );
  }
}
