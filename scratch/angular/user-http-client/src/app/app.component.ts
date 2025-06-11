import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateUserFormComponent, UserListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user-http-client';
}
