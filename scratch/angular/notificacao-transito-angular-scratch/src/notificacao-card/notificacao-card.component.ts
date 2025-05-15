import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-notificacao-card',
  imports: [],
  templateUrl: './notificacao-card.component.html',
  styleUrl: './notificacao-card.component.css'
})
export class NotificacaoCardComponent {
  placa = signal("ABC1234");
  cpf = signal("111.111.111-10");
  dataNotificacao = signal("10/05/2025");
  valor = signal(250);
  descricao = signal("Excesso de velocidade");

}
