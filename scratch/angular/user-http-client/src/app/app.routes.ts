import { Routes } from '@angular/router';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'users',
    component: UserListComponent,
    title: 'Users List'
  },
  {
    path: 'users/:id',
    component: UserProfileComponent,
    title: 'User Details',
  },
  {
    path: 'userDetails',
    component: UserDetailsComponent,
    title: 'User Details',
  },
  {
    path: 'users/new',
    component: CreateUserFormComponent,
    title: 'Novo Usuário'
  },
  {
    path: 'user/:id',
    component: UserProfileComponent,
    title: 'Perfil'
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found'
  }
];
