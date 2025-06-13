import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';

import { CreateUserFormComponent } from './create-user-form/create-user-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListUsersComponent, CreateUserFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'http-client-users';
}
