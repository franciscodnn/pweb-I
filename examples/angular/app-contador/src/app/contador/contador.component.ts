import { Component, model, input, output, signal } from '@angular/core';

@Component({
  selector: 'contador-component',
  imports: [],
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent {
  valor = model(0);
  // valorInicial = input.required<number>();
  // valor = signal(0);
  // valorModel = model(0);
  // valor = signal(this.valorInicial());

  status = output<string>();

  constructor() {
    // this.valor.set(this.valorInicial());
  }
  

  incrementar() {
    this.valor.update(
      value => value + 1
    );    
    this.status.emit('incremento');
  }

  decrementar() {
    this.valor.update(
      valor => valor - 1
    );
    this.status.emit('decremento');
  }

}
