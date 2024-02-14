import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormType } from '../interfaces/form.model';

@Injectable({
  providedIn: 'root',
})
export class BuildFormByModalFormTypeService {
  private modalFormGroup?: FormGroup;

  constructor() {}

  public buildFormByModalFormType(modalFormType: FormType): FormGroup {
    switch (modalFormType) {
      case 'group':
        this.modalFormGroup = new FormGroup({
          name: new FormControl('', Validators.required),
        });
        break;
      case 'student':
        this.modalFormGroup = new FormGroup({
          firstname: new FormControl('', Validators.required),
          lastname: new FormControl('', Validators.required),
          email: new FormControl(''),
        });
        break;
      case 'class':
        this.modalFormGroup = new FormGroup({
          name: new FormControl('', Validators.required),
          coefficient: new FormControl(1),
        });
        break;
      default:
        this.modalFormGroup = new FormGroup({});
    }

    return this.modalFormGroup;
  }
}
