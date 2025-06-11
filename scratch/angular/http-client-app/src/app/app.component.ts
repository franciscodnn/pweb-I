import { Component, effect, model, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, USERS } from './data/users';
import { ConfigServiceService } from '../services/config-service.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Dashboard de Usuários';
  users = model<User[]>([]);
  isOffcanvasOpen = false;
  userData: User[] | null = null;
  userForm: FormGroup;

  configService = inject(ConfigServiceService);
  private fb = inject(FormBuilder);

  constructor() {
    // Inicializa o formulário reativo
    this.userForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Carrega dados apenas uma vez na inicialização
    // this.loadUsers();

    effect(() => {
      this.configService.loadData('users').subscribe(
        {
          next: (data) => {
            this.userData = data as User[];
            this.users.set(this.userData);
            console.log('Data loaded: ' + this.userData?.length);
          },
          error: (error) => {
            console.error('Error loading data:', error);
          }
        });
      });
  }

  removeUser(id: number) {
    console.log(`User with ID ${id} removed successfully.`) ;
    this.configService.remove('users', id).subscribe();
  }

  openOffcanvas() {
    this.isOffcanvasOpen = true;
  }

  closeOffcanvas() {
    this.isOffcanvasOpen = false;
    this.resetForm();
  }

  addUser() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const newUser: User = {
        id: this.users()?.length > 0 ? Math.max(...this.users().map(u => u.id)) + 1 : 1,
        nome: formValue.nome,
        email: formValue.email,
        login: formValue.login,
        senha: formValue.senha
      };
      
      // Adiciona no backend primeiro
      this.configService.add('users', newUser).subscribe(() => {
        // Depois atualiza localmente
        this.users.set([...this.users(), newUser]);
        console.log(`User ${newUser.nome} added successfully.`);
        this.closeOffcanvas();
      });
    } else {
      // Marca todos os campos como touched para mostrar erros de validação
      this.markFormGroupTouched();
    }
  }

  resetForm() {
    this.userForm.reset();
  }

  private markFormGroupTouched() {
    Object.keys(this.userForm.controls).forEach(field => {
      const control = this.userForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  // Getters para facilitar o acesso aos controles no template
  get nome() { return this.userForm.get('nome'); }
  get email() { return this.userForm.get('email'); }
  get login() { return this.userForm.get('login'); }
  get senha() { return this.userForm.get('senha'); }
}
