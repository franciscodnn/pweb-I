import { Component, signal, inject } from '@angular/core';
import { ApiClientService } from '../services/api-client.service';
import { User } from '../model/user.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  user = signal<User | null>(null);

  private route = inject(ActivatedRoute);
  private apiClient = inject(ApiClientService);

  constructor() {
    this.route.queryParams.subscribe(params => {
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
