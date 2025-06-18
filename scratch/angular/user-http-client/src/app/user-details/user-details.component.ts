import { Component, signal, inject } from '@angular/core';
import { User } from '../model/user.interface';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  user = signal<User | null>(null);
  private route = inject(ActivatedRoute);

  private storageService = inject(StorageService);

  constructor() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];

      this.storageService.getUserById(id).subscribe({
        next: (user: User) => {
          this.user.set(user);
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
          this.user.set(null);
        }
      });
    });
  }
}
