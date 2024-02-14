import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [],
  template: ` <div class="empty-home-container">
    <p>
      {{ emptyIndication }}
    </p>
  </div>`,
  styles: `
    .empty-home-container {
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
  @Input() emptyIndication: string = 'Sélectionnez ou ajoutez un groupe';
}
