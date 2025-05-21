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

  multasPagas = signal(0);

  verDadosSensiveis = signal(true);

  atualizarVisao() {
    this.verDadosSensiveis.set(!this.verDadosSensiveis());
  }

  atualizarStatus(id: number){
    console.log('Atualizando status da notificação com ID:', id);

    this.notificacoes.update((notificacoes) => {
      const notificacao = notificacoes.find((n) => n.id === id);
      if (notificacao) {
        notificacao.status = notificacao.status === 'pendente' ? 'paga' : 'pendente';
      }
      return [...notificacoes];
    }
    );

    console.log('Notificações atualizadas:', this.notificacoes());

    this.multasPagas.update((multasPagas) => {
      const notificacao = this.notificacoes().find((n) => n.id === id);
      if (notificacao && notificacao.status === 'paga') {
        return multasPagas + 1;
      } else if (notificacao && notificacao.status === 'pendente') {
        return multasPagas - 1;
      }
      return multasPagas;
    });

  }

}
