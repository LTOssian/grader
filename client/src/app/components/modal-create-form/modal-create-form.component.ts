import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, KeyValuePipe } from '@angular/common';

import { ErrorModel } from '../../interfaces/error-model';
import { FormType } from '../../interfaces/form-model';
import { GroupService } from '../../services/group.service';
import { MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ModalFormButtonComponent } from './modal-form-button/modal-form-button.component';

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
  private groupService = inject(GroupService);

  // Modal bound properties
  public title: string | null = null;
  public labelsByInput: Record<string, string> | null = null;
  public entityToCreate: FormType | null = null;
  public modalFormGroup: FormGroup | null = null;

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
  public getFormControlKey(controlFieldKey: unknown): string {
    return controlFieldKey as string;
  }

  /**
   * Gets the value of the label via the labelsByInputs record
   * @param keyValue form control key
   * @returns the label of the specified input
   */
  public getLabelNameFromInputs(keyValue: unknown): string {
    return this.labelsByInput?.[keyValue as string] || '';
  }

  /**
   * Perfmors request bases on the type of the current modal
   */
  public onSubmit(): void {
    if (!this.entityToCreate) this.cancelModal();
    if (!this.modalFormGroup) return;

    switch (this.entityToCreate) {
      case 'group':
        this.groupService
          .createGroupWithBody(this.modalFormGroup.value)
          .subscribe({
            next: (responseData) => {
              this.modalRef.close({
                message: 'Entitée crée avec succès',
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
}
