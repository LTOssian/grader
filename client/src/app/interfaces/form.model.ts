import { FormControl, FormGroup } from '@angular/forms';

export type FormType = 'group' | 'student' | 'class' | 'pdf';

interface ModalMessage {
  isSuccess: boolean;
}

export interface ModalSuccesMessage extends ModalMessage {
  isSuccess: true;
  message: string;
  entity: object;
}

export interface ModalFailMessage extends ModalMessage {
  isSuccess: false;
  message: string;
}

export interface IModalRef {
  group_id?: string;
  entity_id?: string;
  title: string;
  subtitle: string;
  labelsByInput: Record<string, string>;
  placeholdersByInput: Record<string, string | number>;
  typeByInput: Record<string, string>;
  entityToCreate: FormType;
  modalFormGroup: FormGroup<any>;
}

export enum ModalMessageEnum {
  SUCCESS = 'Entitée crée avec succès',
}

export interface GradeFormGroup {
  [key: string]: FormGroup<{
    coefficient: FormControl<number | null>;
    grade: FormControl<number | null>;
  }>;
}
