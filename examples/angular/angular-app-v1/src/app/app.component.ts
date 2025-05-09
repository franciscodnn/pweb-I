import { Component, signal, computed } from '@angular/core';
import { ContadorComponent } from '../contador/contador.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  
  imports: [ContadorComponent],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app-v1';
  
}
