import { FormGroup } from '@angular/forms';

export type FormType = 'group' | 'student' | 'class';

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
  title: string;
  labelsByInput: Record<string, string>;
  placeholdersByInput: Record<string, string | number>;
  entityToCreate: FormType;
  modalFormGroup: FormGroup<any>;
}

export enum ModalMessageEnum {
  SUCCESS = 'Entitée crée avec succès',
}
