import { Component, signal, model, computed } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { ContadorComponent } from './contador/contador.component';

@Component({
  selector: 'app-root',
  imports: [ContadorComponent, UpperCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contador-app';
  status = signal('');
  count = model(0);

  novoValor = computed(() => {
    console.log(this.count() * 2);

    return this.count() * 2;
  });

  imagem = 'https://www.ifpb.edu.br/imagens/logotipos/ifpb-1';

  updateStatus(event: string) {
    this.status.set(event);
  }
}
