import { Component, input } from '@angular/core';

@Component({
  selector: 'app-entity-add-button',
  standalone: true,
  imports: [],
  template: '<button type="button">{{ buttonAddText() }}</button>',
  styles: `
    button {
      background-color: var(--clr-black-primary);
      border: none;
      border-radius: var(--border-radius);
      padding: 16px;
      cursor: pointer;

      color: var(--clr-white-primary);
      font-weight: 500;
      font-size: var(--fs-body);
    }
  `,
})
export class EntityAddButtonComponent {
  public buttonAddText = input.required<string>();
}
