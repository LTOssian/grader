import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [],
  template: ` <div class="empty-container">
    <p>
      {{ emptyIndication() }}
    </p>
  </div>`,
  styles: `
    .empty-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    p {
      color: var(--clr-black-secondary);
      font-weight: 500;
    }
  `,
})
export class EmptyComponent {
  public emptyIndication = input.required<string>();
}
