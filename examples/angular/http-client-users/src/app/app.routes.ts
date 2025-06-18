import { Routes } from '@angular/router';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'new-user', // localhost:4200/new-user
        component: CreateUserFormComponent,
        title: 'Novo usuário'
    },
    {
      path: 'list-users', // localhost:4200/list-users
      component: ListUsersComponent,
      title: 'Usuários cadastrados'
    },
    {
      path: 'user/:id',
      component: UserComponent,
      title: 'Detalhamento do usuário'
    },
    {
      path: 'user-detail',
      component: UserDetailComponent,
      title: 'Detalhamento'
    },
    {
      path: '**',
      component: NotFoundComponent,
      title: 'Página não encontrada!'
    }
];
