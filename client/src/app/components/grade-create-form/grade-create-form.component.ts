import { Component, DestroyRef, Input, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ModalCreateFormComponent } from '../modal-create-form/modal-create-form.component';
import { Subject, switchMap } from 'rxjs';

import { BuildFormService } from '../../services/form-builder.service';
import { ClassModel } from '../../interfaces/class.model';
import {
  GradeFormGroup,
  IModalRef,
  ModalFailMessage,
  ModalSuccesMessage,
} from '../../interfaces/form.model';
import { GradeModel, GradeModel_Post } from '../../interfaces/grade.model';
import { GradeService } from '../../services/grade.service';
import { ModalFormButtonComponent } from '../modal-create-form/modal-form-button/modal-form-button.component';
import { StudentModel } from '../../interfaces/student.model';
import { StudentService } from '../../services/student.service';

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
  }

  private studentService = inject(StudentService);
  private gradeService = inject(GradeService);
  private destroyRef = inject(DestroyRef);
  private formBuilder = inject(BuildFormService);
  private modalService = inject(MdbModalService);
  private router = inject(Router);

  private modalCreateRef: MdbModalRef<ModalCreateFormComponent> | null = null;

  public student_id = signal<string>('');

  public gradeFormGroup: FormGroup<GradeFormGroup> = new FormGroup({});
  public isError = signal<boolean>(false);
  public hasUsedDownloadButton = signal<boolean>(false);

  // Signals with business data
  public classes = signal<Omit<ClassModel, 'class_id'>[]>([]);
  public student = signal<StudentModel>({} as StudentModel);

  // Subjects triggers
  private createGradeTrigger$ = new Subject<GradeModel_Post>();
  private getPdfTrigger$ = new Subject<GradeModel_Post>();

  constructor() {
    this.initializeTriggers();
  }

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

  public goBackToGroup() {
    this.router.navigate(['group', this.student().group_id]);
  }

  private initializeTriggers() {
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
        next: ({ data }) => {
          this.goBackToGroup();
          if (data && this.hasUsedDownloadButton()) {
            this.openDownloadModal({
              student_grades_id: data.student_grades_id,
              created_at: data.created_at,
            });
          }
        },
        error: () => this.isError.set(true),
      });
  }

  public onSubmit(handleDownload: boolean = false) {
    if (!this.isFormValid()) return;

    const requestBody: GradeModel_Post = {
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
    };

    this.hasUsedDownloadButton.set(handleDownload);
    this.createGradeTrigger$.next(requestBody);
  }

  private isFormValid(): boolean {
    if (!this.gradeFormGroup.valid) {
      this.isError.set(true);
      setTimeout(() => {
        this.isError.set(false);
      }, 3000);
    }

    return this.gradeFormGroup.valid;
  }

  private openDownloadModal(
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
          gradeCredentials.created_at || ''
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
