import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-form-button',
  standalone: true,
  imports: [],
  template: `<button
    [class.confirm]="confirm"
    [type]="confirm ? 'submit' : 'button'"
  >
    {{ buttonText }}
  </button>`,
  styles: `button {
    background: none;
    border: none;
    border-radius: var(--border-radius);

    width: 100%;
    padding: 8px;

    color: var(--clr-white-primary);
    font-weight: 500;
    font-size: var(--fs-body);

    background-color: var(--clr-accent-red);
  }
  .confirm {
    background-color: var(--clr-accent-purple);
  }
  `,
})
export class ModalFormButtonComponent {
  @Input({ required: true }) buttonText!: string;
  @Input() confirm: boolean = true;
}
