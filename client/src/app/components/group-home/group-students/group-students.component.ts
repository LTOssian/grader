import { Component, EventEmitter, Output, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AssetPath } from '../../../../assets/assets-path';
import { EntityAddButtonComponent } from '../entity-add-button/entity-add-button.component';
import { EmptyComponent } from '../../empty/empty.component';
import { StudentModel } from '../../../interfaces/student.model';

@Component({
  selector: 'app-group-students',
  standalone: true,
  templateUrl: './group-students.component.html',
  styleUrl: './group-students.component.scss',
  imports: [EntityAddButtonComponent, RouterLink, EmptyComponent],
})
export class GroupStudentsComponent {
  public students = input.required<StudentModel[]>();
  @Output() onDeleteClick: EventEmitter<{ type: 'student'; id: string }> =
    new EventEmitter();

  public studentEmptyText = signal<string>('Aucun étudiant.');
  public assetsStore = {
    trashSvg: {
      path: AssetPath.TRASH,
      alt: 'Icône de poubelle',
    },
    tabSvg: {
      path: AssetPath.TAB_NOTE,
      alt: "Icône d'un tab note",
    },
  };

  public deleteStudent({ student_id }: Pick<StudentModel, 'student_id'>): void {
    this.onDeleteClick.emit({ type: 'student', id: student_id });
  }
}
