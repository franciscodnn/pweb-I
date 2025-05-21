// tarefa-item.component.ts
import { Component, input, output } from '@angular/core';
import { Tarefa } from '../tarefa/tarefa.interface';

@Component({
  selector: 'app-tarefa-item',
  standalone: true,
  templateUrl: './tarefa-item.component.html',
  styleUrls: ['./tarefa-item.component.css']
})
export class TarefaItemComponent {
  tarefa = input.required<Tarefa>();
  // @Input({ required: true }) tarefa!: Tarefa;

  tarefaConcluida = output<number>();
  tarefaRemovida = output<number>();
  // @Output() tarefaConcluida = new EventEmitter<number>();
  // @Output() tarefaRemovida = new EventEmitter<number>();

  marcarConcluida() {
    this.tarefaConcluida.emit(this.tarefa().id);
  }
  
  remover() {
    this.tarefaRemovida.emit(this.tarefa().id);
  }
}