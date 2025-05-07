import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-contador',
  standalone: true,
  templateUrl: './contador.component.html'
})
export class ContadorComponent {
  count = signal(0); // valor inicial do contador

  dobro = computed(() => {
    return this.count() * 2;
  });

  incrementar() {
    this.count.set(this.count() + 1);
  }

  
}
