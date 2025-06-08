import { Component, effect, model, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, USERS } from './data/users';
import { ConfigServiceService } from '../services/config-service.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Dashboard de Usuários';
  users = model<User[]>([]);
  isOffcanvasOpen = false;
  userData: User[] | null = null;

  configService = inject(ConfigServiceService);

  constructor() {
    // Carrega dados apenas uma vez na inicialização
    // this.loadUsers();

    effect(() => {
      this.configService.loadData('users').subscribe(
      data => {
        this.userData = data as User[];
        this.users.set(this.userData);
        console.log('Data loaded: ' + this.userData?.length);
      });
    });
  }

  loadUsers() {
    
  }
  
  newUser: User = {
    id: 0,
    nome: '',
    email: '',
    login: '',
    senha: ''
  };

  removeUser(id: number) {
    console.log(`User with ID ${id} removed successfully.`) ;
    this.configService.remove('users', id).subscribe();
  }

  openOffcanvas() {
    this.isOffcanvasOpen = true;
  }

  closeOffcanvas() {
    this.isOffcanvasOpen = false;
    this.resetNewUser();
  }

  addUser() {
    if (this.newUser.nome && this.newUser.email && this.newUser.login && this.newUser.senha) {
      this.newUser.id = this.users()?.length > 0 ? Math.max(...this.users().map(u => u.id)) + 1 : 1;
      
      // Adiciona no backend primeiro
      this.configService.add('users', this.newUser).subscribe(() => {
        // Depois atualiza localmente
        this.users.set([...this.users(), { ...this.newUser }]);
        console.log(`User ${this.newUser.nome} added successfully.`);
        this.closeOffcanvas();
      });
    }
  }

  resetNewUser() {
    this.newUser = {
      id: 0,
      nome: '',
      email: '',
      login: '',
      senha: ''
    };
  }
}
