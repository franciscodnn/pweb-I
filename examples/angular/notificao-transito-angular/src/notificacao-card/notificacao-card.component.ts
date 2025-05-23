import { Component, signal, computed, input } from '@angular/core';

@Component({
  selector: 'notificacao-card',
  imports: [],
  templateUrl: './notificacao-card.component.html',
  //template: `
    // <h1>Olá, Mundo</h1>
  //`,
  styleUrl: './notificacao-card.component.css'
})
export class NotificacaoCardComponent {
  placa = input.required<string>();
  cpf = input.required<string>();
  dataNotificacao = input.required<string>();  
  valor = input.required<string>();
  descricao = input.required<string>();

  formatarCPF = computed(
    () => this.cpf().replace(/\d{3}-\d{2}$/, '***-**')
  );

  formatarValor = computed(
    () => {
      if(Number(this.valor()) > 0){
        return "***";
      }
      return this.valor();
    }
  );

  // valor = input.required<number, string>({
  //   transform: (valor: string): number => Number(valor)
  // });

}

function transformarStringToNumber(valor: string): number {
  return Number(valor);
}