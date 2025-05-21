// lista-tarefas.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaItemComponent } from '../tarefa-item/tarefa-item.component';
import { TarefaFormComponent } from '../tarefa-form/tarefa-form.component';
import { Tarefa } from '../tarefa/tarefa.interface';

@Component({
  selector: 'app-lista-tarefas',
  standalone: true,
  imports: [CommonModule, TarefaItemComponent, TarefaFormComponent],
  template: `
    <div class="container">
      <h1>Lista de Tarefas</h1>
      
      <app-tarefa-form
        (tarefaAdicionada)="adicionarTarefa($event)"
      ></app-tarefa-form>
      
      <div class="estatisticas">
        <p>Total: {{ tarefas().length }}</p>
        <p>Concluídas: {{ tarefasConcluidas }}</p>
        <p>Pendentes: {{ tarefas().length - tarefasConcluidas }}</p>
      </div>
      
      <div class="lista-tarefas">
        @for (tarefa of tarefas(); track tarefa.id) {
          <app-tarefa-item
            [tarefa]="tarefa"
            (tarefaConcluida)="marcarConcluida($event)"
            (tarefaRemovida)="removerTarefa($event)"
          ></app-tarefa-item>
        } @empty {
          <p class="mensagem-vazia">Nenhuma tarefa adicionada.</p>
        }
      </div>
      
      @if (tarefas().length > 0) {
        <div class="acoes">
          <button class="btn-limpar" (click)="limparTarefas()">
            Limpar Todas
          </button>
        </div>
    }
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    
    h1 {
      text-align: center;
      color: #333;
    }
    
    .estatisticas {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      padding: 10px;
      background-color: #f0f0f0;
      border-radius: 4px;
    }
    
    .mensagem-vazia {
      text-align: center;
      color: #888;
      padding: 20px;
    }
    
    .acoes {
      margin-top: 20px;
      text-align: center;
    }
    
    .btn-limpar {
      padding: 8px 16px;
      background-color: #ff9800;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class ListaTarefasComponent {
  // tarefas: Tarefa[] = [];
  tarefas = signal<Tarefa[]>([]);
  proximoId = 1;
  
  get tarefasConcluidas(): number {
    return this.tarefas().filter(t => t.concluida).length;
  }
  
  adicionarTarefa(titulo: string) {
    const novaTarefa: Tarefa = {
      id: this.proximoId++,
      titulo,
      concluida: false
    };
    
    this.tarefas.set([...this.tarefas(), novaTarefa]);
  }
  
  marcarConcluida(id: number) {
    this.tarefas.set(this.tarefas().map(tarefa => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    }));
  }
  
  removerTarefa(id: number) {
    this.tarefas.set(this.tarefas().filter(tarefa => tarefa.id !== id));
  }
  
  limparTarefas() {
    this.tarefas.set([]);
  }
}