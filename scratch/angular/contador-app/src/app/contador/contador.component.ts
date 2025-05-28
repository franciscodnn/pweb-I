import { Component, signal, model, input, output, effect, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-contador',
  imports: [ReactiveFormsModule, UpperCasePipe],
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent {
  countValue = signal(0);
  initialCount = model(0);
  change = output<string>();
  inputValue = new FormControl('');



  toUpperCaseInput = computed(() => {
    console.log(`Valor do input: ${this.inputValue.value}`);
    return this.inputValue?.value?.toUpperCase();
  });

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
