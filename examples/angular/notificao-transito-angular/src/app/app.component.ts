import { Component } from '@angular/core';
import { NotificacaoCardComponent } from '../notificacao-card/notificacao-card.component';

@Component({
  selector: 'app-root',
  imports: [NotificacaoCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'notificao-transito-angular';
}
