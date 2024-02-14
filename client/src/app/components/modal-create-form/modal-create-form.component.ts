import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, KeyValuePipe } from '@angular/common';

import { FormModel } from '../../interfaces/form-model';
import { MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal-create-form',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    KeyValuePipe,
    MdbModalModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-create-form.component.html',
  styleUrl: './modal-create-form.component.scss',
})
export class ModalCreateFormComponent {
  public title: string | null = null;
  public inputs: FormModel[] | null = null;
  public modalFormGroup: FormGroup | null = null;

  constructor(public modalRef: MdbModalRef<ModalCreateFormComponent>) {}

  public getTypeOf(value: any) {
    return typeof value;
  }

  public getFormControlKey(controlField: unknown): string {
    return controlField as string;
  }

  public getLabelNameFromInputs(keyValue: unknown): string {
    return (
      this.inputs?.find((input) =>
        Object.keys(input).some((key) => key == keyValue)
      )?.name || ''
    );
  }
}
