import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Injectable, inject } from '@angular/core';

import { GradeFormGroup, FormType } from '../interfaces/form.model';
import { ClassModel } from '../interfaces/class.model';

@Injectable({
  providedIn: 'root',
})
export class BuildFormService {
  private formBuilder = inject(FormBuilder);

  constructor() {}

  public buildFormByModalFormType(modalFormType: FormType): FormGroup {
    let modalFormGroup: FormGroup;
    switch (modalFormType) {
      case 'group':
        modalFormGroup = new FormGroup({
          name: new FormControl('', Validators.required),
        });
        break;
      case 'student':
        modalFormGroup = new FormGroup({
          firstname: new FormControl('', Validators.required),
          lastname: new FormControl('', Validators.required),
          email: new FormControl(''),
        });
        break;
      case 'class':
        modalFormGroup = new FormGroup({
          name: new FormControl('', Validators.required),
          coefficient: new FormControl(1),
        });
        break;
      default:
        modalFormGroup = new FormGroup({});
    }

    return modalFormGroup;
  }

  /**
   * Sets a formGroup for the grading
   * @param credentials class without class_id
   * @returns formGroup
   */
  public buildFormGroupsFromClasses(
    credentials: Omit<ClassModel, 'class_id'>[]
  ): FormGroup {
    let classesGroups = credentials.reduce<GradeFormGroup>(
      (acc, { name, coefficient }) => {
        acc[name] = this.formBuilder.group({
          coefficient: [coefficient, [Validators.required, Validators.min(1)]],
          grade: [
            null as number | null,
            [Validators.required, Validators.max(20), Validators.min(0)],
          ],
        });
        return acc;
      },
      {}
    );

    return this.formBuilder.group(classesGroups);
  }
}
