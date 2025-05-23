import { Component, model, signal } from '@angular/core';
import { ContadorComponent } from './contador/contador.component';

@Component({
  selector: 'app-root',
  imports: [ContadorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-contador';

  valorInicializacao = model(15);
  status = signal('');

  tratarStatus(novoStatus: string) {
    this.status.set(novoStatus);
    console.log(
      `Novo valor: ${this.valorInicializacao()}`
    );
  }
}
