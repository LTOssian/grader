import { Component, EventEmitter, Output, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AssetPath } from '../../../../assets/assets-path';
import { EmptyComponent } from '../../empty/empty.component';
import { GradeModel, GradeModel_Get } from '../../../interfaces/grade.model';

@Component({
  selector: 'app-group-grades',
  standalone: true,
  templateUrl: './group-grades.component.html',
  styleUrl: './group-grades.component.scss',
  imports: [RouterLink, EmptyComponent],
})
export class GroupGradesComponent {
  public grades = input.required<GradeModel_Get[]>();
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
}
