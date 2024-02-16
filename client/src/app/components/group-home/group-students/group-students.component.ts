import { Component, input } from '@angular/core';

import { AssetPath } from '../../../../assets/assets-path';
import { EntityAddButtonComponent } from '../entity-add-button/entity-add-button.component';
import { StudentModel } from '../../../interfaces/student.model';

@Component({
  selector: 'app-group-students',
  standalone: true,
  imports: [EntityAddButtonComponent],
  templateUrl: './group-students.component.html',
  styleUrl: './group-students.component.scss',
})
export class GroupStudentsComponent {
  public students = input.required<StudentModel[]>();

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
}
