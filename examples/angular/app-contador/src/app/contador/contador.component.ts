import { Component, model, input, output, signal } from '@angular/core';

import { PercentPipe } from '@angular/common';

import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'contador-component',
  imports: [ReactiveFormsModule],
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent {
  valor = model(0);
  // valorInicial = input.required<number>();
  // valor = signal(0);
  // valorModel = model(0);
  // valor = signal(this.valorInicial());

  situacao = output<string>();

  numeros = [1, 3, 5, 7, 9];

  valorInicializado = new FormControl();
  nome = new FormControl();

  constructor() {
    // this.valor.set(this.valorInicial());
  }
  

  incrementar() {
    this.valor.update(
      value => value + 1
    );
    this.situacao.emit('incremento');
  }

  decrementar() {
    this.valor.update(
      valor => valor - 1
    );
    this.situacao.emit('decremento');
  }

}
