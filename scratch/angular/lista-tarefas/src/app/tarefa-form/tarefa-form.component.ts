import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarefa-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="tarefa-form">
      <input
        type="text"
        [(ngModel)]="novaTarefa"
        placeholder="Digite uma nova tarefa"
        (keyup.enter)="adicionarTarefa()"
      />
      <button (click)="adicionarTarefa()">Adicionar</button>
    </div>
  `,
  styles: [`
    .tarefa-form {
      display: flex;
      margin-bottom: 20px;
    }
    
    input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-right: 8px;
    }
    
    button {
      padding: 8px 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class TarefaFormComponent {
  novaTarefa = signal('');
  tarefaAdicionada = output<string>();
  
  adicionarTarefa() {
    if (this.novaTarefa().trim()) {
      this.tarefaAdicionada.emit(this.novaTarefa());
      this.novaTarefa.set('');
    }
  }
}
