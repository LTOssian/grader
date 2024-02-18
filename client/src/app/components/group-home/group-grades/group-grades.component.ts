import {
  Component,
  EventEmitter,
  Output,
  inject,
  input,
  signal,
} from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { AssetPath } from '../../../../assets/assets-path';
import { EmptyComponent } from '../../empty/empty.component';
import { GradeModel, GradeModel_Get } from '../../../interfaces/grade.model';
import { ModalCreateFormComponent } from '../../modal-create-form/modal-create-form.component';
import {
  IModalRef,
  ModalFailMessage,
  ModalSuccesMessage,
} from '../../../interfaces/form.model';

@Component({
  selector: 'app-group-grades',
  standalone: true,
  templateUrl: './group-grades.component.html',
  styleUrl: './group-grades.component.scss',
  imports: [RouterLink, EmptyComponent],
})
export class GroupGradesComponent {
  private location = inject(Location);
  private modalService = inject(MdbModalService);

  private modalCreateRef: MdbModalRef<ModalCreateFormComponent> | null = null;

  public grades = input.required<GradeModel_Get[]>();
  public group_id = input<string>();
  public isGradesPage = input<boolean>();
  @Output() onDeleteClick: EventEmitter<{ type: 'grade'; id: string }> =
    new EventEmitter();

  public gradeEmptyText = signal<string>('Aucun bulletin généré.');
  public assetsStore = {
    trashSvg: {
      path: AssetPath.TRASH,
      alt: 'Icône de poubelle',
    },
    downloadSvg: {
      path: AssetPath.DOWNLOAD,
      alt: 'Icône de téléchargement',
    },
  };

  public deleteGrade({
    student_grades_id,
  }: Pick<GradeModel, 'student_grades_id'>) {
    this.onDeleteClick.emit({ type: 'grade', id: student_grades_id });
  }

  public goBack() {
    return this.location.back();
  }

  public formatDate(dateAsString: string) {
    return new Date(dateAsString).toLocaleString();
  }

  public openDownloadModal(
    gradeCredentials: Pick<GradeModel, 'created_at' | 'student_grades_id'>
  ) {
    this.modalCreateRef = this.modalService.open<
      ModalCreateFormComponent,
      Omit<
        IModalRef,
        | 'group_id'
        | 'modalFormGroup'
        | 'labelsByInput'
        | 'placeholdersByInput'
        | 'typeByInput'
      >
    >(ModalCreateFormComponent, {
      data: {
        title: 'Télécharger le bulletin',
        subtitle: `du ${new Date(
          gradeCredentials?.created_at
        ).toLocaleString()}`,
        entityToCreate: 'pdf',
        entity_id: gradeCredentials.student_grades_id,
      },
    });

    this.modalCreateRef.onClose.subscribe(
      (message: ModalFailMessage | ModalSuccesMessage) => {
        if (!message.isSuccess) return;
        console.info(message.message);
      }
    );
  }
}
