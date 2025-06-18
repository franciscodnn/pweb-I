import { Component, signal, effect, inject } from '@angular/core';
import { ApiClientService } from '../services/api-client.service';
import { User } from '../model/user.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'list-users-component',
  imports: [RouterLink],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
  users = signal<User[]>([]);
  private apiClient = inject(ApiClientService);


  constructor() {
    effect(() => {
      const allUsers = this.apiClient.getAllUsers('users').subscribe({
        next: (data: User[]) => {
          console.log(data);

          this.users.set(
            [...data]
          );
          // return data;
        },
        error: (erro: any) => {
          console.error(erro);
        }
      }); // end of subscribe     
    }); // end of effect
  }
  
}
