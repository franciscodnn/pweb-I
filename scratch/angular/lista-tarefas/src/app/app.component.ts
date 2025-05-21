// app.component.ts
import { Component } from '@angular/core';
import { ListaTarefasComponent } from './lista-tarefas/lista-tarefas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaTarefasComponent],
  template: `
    <div class="app-container">
      <app-lista-tarefas></app-lista-tarefas>
    </div>
  `,
  styles: [`
    .app-container {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
  `]
})
export class AppComponent {}