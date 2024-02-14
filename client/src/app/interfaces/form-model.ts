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
