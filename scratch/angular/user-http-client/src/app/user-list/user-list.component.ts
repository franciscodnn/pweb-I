import { Component, model, effect, inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { User } from '../model/user.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'user-list',
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  storageService = inject(StorageService);
  usersList = model<User[]>([]);

  constructor() {
    effect(() => {
      this.storageService.getUsers().subscribe({
        next: data => {
          this.usersList.set(data);
          console.log('Users fetched:', data);
        },
        error: error => {
          console.error('Error fetching users:', error);
        }
      });
    });
  }

}
