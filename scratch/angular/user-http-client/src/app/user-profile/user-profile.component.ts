import { Component, input } from '@angular/core';
import { User } from '../model/user.interface';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user = input<User>();
}
