import {
  Component,
  EventEmitter,
  Output,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AssetPath } from '../../../../assets/assets-path';
import { EmptyComponent } from '../../empty/empty.component';
import { EntityAddButtonComponent } from '../entity-add-button/entity-add-button.component';
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
  public isAllowedToGrade = input<boolean>(false);
  @Output() onDeleteClick: EventEmitter<{ type: 'student'; id: string }> =
    new EventEmitter();
  @Output() onModalClick: EventEmitter<{ type: 'student' }> =
    new EventEmitter();

  private router = inject(Router);

  public studentEmptyText = signal<string>('Aucun étudiant.');
  public isError = signal<boolean>(false);
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

  public openModal() {
    this.onModalClick.emit({ type: 'student' });
  }

  public goToGradeForm(student_id: string) {
    if (this.isAllowedToGrade()) {
      this.router.navigate(['/student', student_id]);
    } else {
      this.isError.set(true);

      setTimeout(() => {
        this.isError.set(false);
      }, 4000);
    }
  }
}
