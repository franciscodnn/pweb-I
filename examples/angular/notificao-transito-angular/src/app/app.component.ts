import { Component, signal, computed } from '@angular/core';
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

  primeiraNotificacao = computed(
    () => this.notificacoes()[0]
  );
}
