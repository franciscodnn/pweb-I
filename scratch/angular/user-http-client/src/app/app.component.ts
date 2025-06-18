import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user-http-client';
}
