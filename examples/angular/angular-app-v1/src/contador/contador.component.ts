import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent {
  count = signal(0);

  doubleComputed = computed(
    () => this.count() * 2
  );

  ehPrimoComputed = computed(
    () => {
      for (let i = 2; i < this.count(); i++) {
        if (this.count() % i === 0) return false;
      }

      return true;
    }
  );

  incrementar() {
    // this.count.set(this.count() + 1);
    this.count.update(
      (value) => value + 1
    );
  }
}
