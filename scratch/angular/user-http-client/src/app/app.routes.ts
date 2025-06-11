import { Routes } from '@angular/router';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: 'form',
    component: CreateUserFormComponent,
    title: 'Formulário'
  },
  {
    path: 'user/:id',
    component: UserProfileComponent,
    title: 'Perfil'
  }
];
