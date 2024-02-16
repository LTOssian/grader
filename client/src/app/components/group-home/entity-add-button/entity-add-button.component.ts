import { Component, input } from '@angular/core';

import { AssetPath } from '../../../../assets/assets-path';

@Component({
  selector: 'app-entity-add-button',
  standalone: true,
  imports: [],
  template: `<button type="button">
    {{ buttonAddText() }}
    <img [src]="assetsStore.plusSvg.path" [alt]="assetsStore.plusSvg.path" />
  </button>`,
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

      display: flex;
      align-items: center;
      gap: 16px;
    }
  `,
})
export class EntityAddButtonComponent {
  public buttonAddText = input.required<string>();

  public assetsStore = {
    plusSvg: {
      path: AssetPath.PLUS,
      alt: 'Icône ajout',
    },
  };
}
