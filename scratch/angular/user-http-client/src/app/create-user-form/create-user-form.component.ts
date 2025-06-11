import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { User } from '../model/user.interface';

@Component({
  selector: 'create-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.css'
})
export class CreateUserFormComponent {
  formBuilder = inject(FormBuilder);

  private storageService = inject(StorageService);

  createUserForm = this.formBuilder.group({
    name: [''],
    email: [''],
    login: [''],
    password: [''],
    bio: ['']
  });

  onSubmit() {
    if (this.createUserForm.valid) {
      console.log('Form Submitted!', this.createUserForm.value);

      const newUser: User = {
        ...this.createUserForm.value as User
      };

      this.post(newUser);
      // Here you would typically send the form data to your server
    } else {
      console.log('Form is invalid');
    }
  }

  post(user: User) {
    this.storageService.createUser(user).subscribe({
      next: response => {
        console.log('User created successfully:', response);
      },
      error: error => {
        console.error('Error creating user:', error);
      }
    });
  }

}
