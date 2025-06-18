import { Component, signal, inject } from '@angular/core';
import { User } from '../model/user.interface';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from '../services/api-client.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user = signal<User | null>(null);

  private route = inject(ActivatedRoute);
  private apiClient = inject(ApiClientService);

  constructor() {
    this.route.params.subscribe( params => {
      const id = params['id'];
      // console.log(params['id']);

      this.apiClient.getUserById(id, 'users').subscribe({
        next: (result: User) => {
          this.user.set(result);
        },
        error: (erro) => {
          console.log('Erro!' + erro);
        }
      }

      );
    })
  }

}
