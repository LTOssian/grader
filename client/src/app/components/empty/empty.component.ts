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
    }

    p {
      color: var(--clr-black-secondary);
      text-decoration: underline;
      font-weight: 600;
    }
  `,
})
export class EmptyComponent {
  public emptyIndication = input.required<string>();
}
