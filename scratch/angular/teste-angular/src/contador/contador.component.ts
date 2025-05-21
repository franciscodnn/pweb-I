import { Component, model } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent {
  contador = model<number>(0);

  updateContador(value: number) {
    this.contador.update(currentValue => currentValue + value);
  }

}
