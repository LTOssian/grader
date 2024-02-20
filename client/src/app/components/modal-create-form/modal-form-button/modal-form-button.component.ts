import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-modal-form-button',
  standalone: true,
  imports: [],
  template: `<button
    [class.confirm]="isOkButton()"
    [type]="isSubmit() ? 'submit' : 'button'"
  >
    {{ buttonText() }}
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
  buttonText = input.required<string>();
  isSubmit = input<boolean>(true);
  isOkButton = input<boolean>(true);
}
