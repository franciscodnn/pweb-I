import { Component, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiClientService } from '../services/api-client.service';
import { User } from '../model/user.interface';

@Component({
  selector: 'create-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.css'
})
export class CreateUserFormComponent {  
  private userFormBuilder = inject(FormBuilder);
  private apiClientService = inject(ApiClientService);

  userForm = this.userFormBuilder.group({
    name: [''],
    email: [''],
    age: [0],
    bio: ['']
  });

  handleSubmit() {
    console.log(this.userForm.value);

    const user = this.userForm.value;

    this.apiClientService.createUser(user as User, 'users');
  }

}
