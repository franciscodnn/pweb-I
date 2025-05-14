import { Component, computed, signal, Signal, WritableSignal, effect } from '@angular/core';
// import { UtilsService } from 'utils';

import { formatCurrency, formatDate } from '../../projects/utils/src/lib/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  titulo: string = 'projeto-teste-angular';
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);


  constructor() {
    console.log('AppComponent initialized');

    effect(() => {
      console.log(`O valor de count mudou para: ${this.count()}`);
      // Aqui você pode adicionar qualquer lógica, como animações ou atualizações de UI
    });
  }

  increment() {
    this.count.update(value => value + 1);
  }

  formatCurrency(currency: number): string {
    return formatCurrency(currency);
    // return this.utilsService.formatCurrency(currency);
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR');
  }

}
