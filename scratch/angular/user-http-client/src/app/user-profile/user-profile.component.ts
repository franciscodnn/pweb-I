import { Component, signal, inject } from '@angular/core';
import { User } from '../model/user.interface';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user = signal<User | null>(null);
  private activatedRoute = inject(ActivatedRoute);

  private storageService = inject(StorageService);

  constructor() {
    this.activatedRoute.params.subscribe(params => {
      const userId = params['id'];

      this.storageService.getUserById(userId).subscribe({
        next: (user: User) => {
          this.user.set(user);
          console.log('User data fetched successfully:', user);
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
        }
      });

      console.log('User ID from route:', userId);
      
    });   
    
  }
}
