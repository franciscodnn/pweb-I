import { Component, signal, input, computed, effect } from '@angular/core';

@Component({
  selector: 'notificacao-card',
  imports: [],
  templateUrl: './notificacao-card.component.html',
  styleUrl: './notificacao-card.component.css'
})
export class NotificacaoCardComponent {
  placa = input.required<string>();
  tipo = input.required<string>();
  cpf = input.required<string>();
  dataNotificacao = input<string>();
  valor = input.required<string, number>({transform: formatarMoeda});
  descricao = input<string>();
  verDados = input<boolean>();

  constructor() {
    // Input signals cannot be modified directly
  }

  formatarCpf = computed(() => {
    return !this.verDados() ? this.cpf().replace(/\d/g, '*') : this.cpf();
  });

  titulo = computed(() => {
    return this.tipo() === 'multa' ? 'Notificação de Multa' : 'Notificação de Advertência';
  });
  tipoIndicadorClass = computed(() => {
    return this.tipo() === 'multa' ? 'bg-multa' : 'bg-advertencia';
  });

}

function formatarMoeda(valor: number): string {
  return (Number(valor) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}