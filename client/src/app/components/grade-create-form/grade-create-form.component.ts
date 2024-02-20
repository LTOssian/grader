import { Component, DestroyRef, Input, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Subject, switchMap } from 'rxjs';

import { BuildFormService } from '../../services/form-builder.service';
import { ClassModel } from '../../interfaces/class.model';
import { GradeFormGroup } from '../../interfaces/form.model';
import { GradeModel_Post, TReport } from '../../interfaces/grade.model';
import { GradeService } from '../../services/grade.service';
import { ModalFormButtonComponent } from '../modal-create-form/modal-form-button/modal-form-button.component';
import { StudentModel } from '../../interfaces/student.model';
import { StudentService } from '../../services/student.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-grade-create-form',
  standalone: true,
  imports: [
    JsonPipe,
    RouterLink,
    ReactiveFormsModule,
    ModalFormButtonComponent,
  ],
  templateUrl: './grade-create-form.component.html',
  styleUrl: './grade-create-form.component.scss',
})
export class GradeCreateFormComponent {
  @Input()
  set student_id_param(student_id_param: string) {
    this.student_id.set(student_id_param);
    this.initializeFormData({ student_id: student_id_param });
    this.initializeTriggers({ student_id: student_id_param });
  }

  private studentService = inject(StudentService);
  private gradeService = inject(GradeService);
  private destroyRef = inject(DestroyRef);
  private formBuilder = inject(BuildFormService);
  private router = inject(Router);

  public student_id = signal<string>('');

  public gradeFormGroup: FormGroup<GradeFormGroup> = new FormGroup({});
  public isError = signal<boolean>(false);

  // Signals with business data
  public classes = signal<Omit<ClassModel, 'class_id'>[]>([]);
  public student = signal<StudentModel>({} as StudentModel);

  // Subjects triggers
  private createGradeTrigger$ = new Subject<GradeModel_Post>();
  private getPdfTrigger$ = new Subject<void>();

  constructor() {}

  private initializeFormData({ student_id }: Pick<StudentModel, 'student_id'>) {
    this.studentService
      .getFormValuesByStudentId({ student_id })
      .subscribe((formData) => {
        this.classes.set(formData.data.classes);
        this.student.set({
          student_id: student_id,
          firstname: formData.data.firstname,
          lastname: formData.data.lastname,
          email: formData.data.email,
          group_id: formData.data.group_id,
        });
        this.gradeFormGroup = this.formBuilder.buildFormGroupsFromClasses(
          formData.data.classes
        );
      });
  }

  public goToGroup() {
    this.router.navigate(['group', this.student().group_id]);
  }

  private initializeTriggers({ student_id }: Pick<StudentModel, 'student_id'>) {
    this.createGradeTrigger$
      .pipe(
        switchMap((body) =>
          this.gradeService.createGradeWithReportBody(
            body,
            this.student().group_id
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => this.goToGroup(),
        error: () => this.isError.set(true),
      });
  }

  public onSubmit() {
    if (this.gradeFormGroup.valid) {
      this.createGradeTrigger$.next({
        student_id: this.student_id(),
        report: Object.entries(this.gradeFormGroup.value).map(
          ([className, gradeCoef]) => {
            return {
              class: className,
              coefficient: gradeCoef?.coefficient || 0,
              grade: gradeCoef?.grade || 1,
            };
          }
        ),
      });
    } else {
      this.isError.set(true);

      setTimeout(() => {
        this.isError.set(false);
      }, 3000);
    }
  }
}
