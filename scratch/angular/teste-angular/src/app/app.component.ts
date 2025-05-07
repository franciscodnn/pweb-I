import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  titulo: string = 'projeto-teste-angular';
  count: number = 0;

  constructor() {
    console.log('AppComponent initialized');
  }

  increment() {
    this.count++;
  }

}
