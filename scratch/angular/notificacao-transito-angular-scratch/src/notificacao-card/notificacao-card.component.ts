import { Component, signal, input, computed, output, effect } from '@angular/core';

@Component({
  selector: 'notificacao-card',
  imports: [],
  templateUrl: './notificacao-card.component.html',
  styleUrl: './notificacao-card.component.css'
})
export class NotificacaoCardComponent {
  id = input<number>(0);
  placa = input.required<string>();
  tipo = input.required<string>();
  cpf = input.required<string>();
  dataNotificacao = input<string>();
  valor = input.required<string, number>({transform: formatarMoeda});
  descricao = input<string>();
  status = input<string>();
  verDados = input<boolean>();

  novoStatus = output<number>();

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
    if(this.status() === 'pendente' && this.tipo() === 'multa') {
      return this.tipo() === 'multa' ? 'bg-multa' : 'bg-advertencia';
    }
    
    console.log('multa paga');
    return 'bg-multa-paga';
  });

  handleClick() {
    this.novoStatus.emit(this.id());
  }

}

function formatarMoeda(valor: number): string {
  return (Number(valor) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}