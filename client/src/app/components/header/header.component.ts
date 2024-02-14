import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <header>
      <h1>Bienvenue sur Grader,</h1>
      <p>Vos rendus de notes, organisés et prêt à l'envoi.</p>
    </header>
  `,
  styles: `
    header {
      background-color: var(--clr-accent-purple);
      color: var(--clr-white-secondary);

      padding: 16px;
      border-radius: 4px;

      display: flex;
      flex-flow: column;
      gap: 16px;
    }
  `,
})
export class HeaderComponent {}
