import { Component, signal } from '@angular/core';
import { NotificacaoCardComponent } from '../notificacao-card/notificacao-card.component';
import notificacoesMock from '../dataset/data';

@Component({
  selector: 'app-root',
  imports: [NotificacaoCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'notificao-transito-angular';
  notificacoes = signal(notificacoesMock);

  verDadosSensiveis = signal(true);

  atualizarVisao() {
    this.verDadosSensiveis.set(!this.verDadosSensiveis());
  }
}
