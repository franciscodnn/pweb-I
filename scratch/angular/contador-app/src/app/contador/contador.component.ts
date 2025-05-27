import { Component, signal, model, input, output, effect } from '@angular/core';

@Component({
  selector: 'app-contador',
  imports: [],
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent {
  countValue = signal(0);
  initialCount = model(0);
  change = output<string>();

  constructor() {
    effect(() => {
      console.log(`Contador: ${this.initialCount()}`);
    });
  }

  incrementar(defaultValue: number = 1) {
    this.countValue.update((value) => value + defaultValue);
    this.initialCount.update((value) => value + defaultValue);

    this.change.emit(`Incrementado`);
  }

  decrementar(defaultValue: number = 1) {
    this.countValue.update((value) => value - defaultValue);
    this.initialCount.update((value) => value - defaultValue);

    this.change.emit(`Decrementado`);
  }


}
