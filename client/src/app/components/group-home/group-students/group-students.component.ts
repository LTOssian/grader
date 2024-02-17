import { Component, EventEmitter, Output, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AssetPath } from '../../../../assets/assets-path';
import { EntityAddButtonComponent } from '../entity-add-button/entity-add-button.component';
import { StudentModel } from '../../../interfaces/student.model';

@Component({
  selector: 'app-group-students',
  standalone: true,
  imports: [EntityAddButtonComponent, RouterLink],
  templateUrl: './group-students.component.html',
  styleUrl: './group-students.component.scss',
})
export class GroupStudentsComponent {
  public students = input.required<StudentModel[]>();
  @Output() onDeleteClick: EventEmitter<{ type: 'student'; id: string }> =
    new EventEmitter();

  public assetsStore = {
    trashSvg: {
      path: AssetPath.TRASH,
      alt: 'Icône de poubelle rouge',
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
