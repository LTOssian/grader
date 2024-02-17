import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { JsonPipe, KeyValuePipe } from '@angular/common';

import { MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Observable } from 'rxjs';

import { ClassModel } from '../../interfaces/class.model';
import { ClassService } from '../../services/class.service';
import { ErrorModel } from '../../interfaces/error.model';
import { FormType, ModalMessageEnum } from '../../interfaces/form.model';
import { GradeService } from '../../services/grade.service';
import { GroupModel } from '../../interfaces/group.model';
import { GroupService } from '../../services/group.service';
import { ModalFormButtonComponent } from './modal-form-button/modal-form-button.component';
import { StudentModel } from '../../interfaces/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-modal-create-form',
  standalone: true,
  templateUrl: './modal-create-form.component.html',
  styleUrl: './modal-create-form.component.scss',
  imports: [
    FormsModule,
    JsonPipe,
    KeyValuePipe,
    MdbModalModule,
    ModalFormButtonComponent,
    ReactiveFormsModule,
  ],
})
export class ModalCreateFormComponent {
  public modalRef = inject(MdbModalRef<ModalCreateFormComponent>);
  private classService = inject(ClassService);
  private groupService = inject(GroupService);
  private gradeService = inject(GradeService);
  private studentService = inject(StudentService);

  // Modal bound properties
  public title: string | null = null;
  public subtitle: string | null = null;
  public labelsByInput: Record<string, string> | null = null;
  public placeholdersByInput: Record<string, string | number> | null = null;
  public entityToCreate: FormType | null = null;
  public modalFormGroup: FormGroup | null = null;
  public group_id: string | null = null;
  public entity_id: string | null = null;

  public formState?: ErrorModel;

  /**
   * Gets the type of the var
   * @param value var with unknown value
   * @returns type as string
   */
  public getTypeOf(value: any): string {
    return typeof value;
  }

  /**
   * Infers type for the formControlKey in the template
   * @param controlField
   * @returns param as string
   */
  public getFormControlKey(controlFieldKey: any): string {
    return controlFieldKey as string;
  }

  /**
   * Gets the value of the label of the input
   * @param controlFieldKey name of the input
   * @returns the label of the specified input as string
   */
  public getLabelNameFromInputs(controlFieldKey: any): string {
    return this.labelsByInput?.[controlFieldKey] || '';
  }

  /**
   * Gets the value of the placeholder of the input
   * @param controlFieldKey name of the input
   * @returns the placeholder of the specified input as string
   */
  public getPlaceholderFromInputs(controlFieldKey: any): string {
    return this.placeholdersByInput?.[controlFieldKey].toString() || '';
  }

  /**
   * Perfmors request bases on the type of the current modal
   */
  public onSubmit(): void {
    if (!this.entityToCreate) this.cancelModal();
    if (!this.modalFormGroup) return;

    switch (this.entityToCreate) {
      case 'group':
        this.executeEntityCreation(
          this.groupService.createGroupWithBody(this.modalFormGroup.value)
        );
        break;
      case 'class':
        this.executeEntityCreation(
          this.classService.createClassWithBody({
            ...this.modalFormGroup.value,
            group_id: this.group_id,
          })
        );
        break;
      case 'student':
        this.executeEntityCreation(
          this.studentService.createStudentWithBody({
            ...this.modalFormGroup.value,
            group_id: this.group_id,
          })
        );
        break;
    }
  }

  /**
   * Closes the modal with a fail message
   */
  public cancelModal(): void {
    this.modalRef.close({
      message: 'Opération annulée',
      isSuccess: false,
    });
  }

  /**
   * Executes the rxjs processing of the given method's result
   * @param serviceMethod Observable result of a service method
   */
  private executeEntityCreation(
    serviceMethod: Observable<
      | ErrorModel
      | {
          data: StudentModel | ClassModel | GroupModel;
        }
    >
  ) {
    serviceMethod
      .subscribe({
        next: (responseData) => {
          this.modalRef.close({
            message: ModalMessageEnum,
            isSuccess: true,
            entity: responseData.data,
          });
        },
        error: (responseError) => {
          this.formState = responseError.error;
        },
      })
      .add(() => {
        if (this.formState) {
          setTimeout(() => (this.formState = undefined), 8000);
        }
      });
  }

  public downloadPdf(version: 'simple' | 'complete') {
    this.gradeService
      .downloadGradeById({
        student_grades_id: this.entity_id || '',
        params: new HttpParams().set('version', version),
      })
      .subscribe({
        next: (responseData) => {
          const virtualUrl = window.URL.createObjectURL(
            responseData.body as Blob
          );
          const virtualLink = document.createElement('a');
          virtualLink.href = virtualUrl;
          virtualLink.download =
            responseData.filename?.split('="')[1] ||
            `Bulletin_${version}_${this.entity_id}`;

          virtualLink.click();

          // Clean up
          window.URL.revokeObjectURL(virtualUrl);

          this.modalRef.close({
            message: ModalMessageEnum,
            isSuccess: true,
            entity: responseData.filename,
          });
        },
        error: (responseError) => {
          this.formState = responseError.error;
        },
      })
      .add(() => {
        if (this.formState) {
          setTimeout(() => (this.formState = undefined), 8000);
        }
      });
  }
}
