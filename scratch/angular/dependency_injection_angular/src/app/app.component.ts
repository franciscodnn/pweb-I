import { Component } from '@angular/core';
import { ContadorComponent } from './contador/contador.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ContadorComponent],
})
export class AppComponent {
  title = 'dependency_injection_angular';
}