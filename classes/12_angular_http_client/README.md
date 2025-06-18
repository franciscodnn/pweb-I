[main](../../README.md)

# Aula 12 - HTTP Client no Angular v19 - Aula Completa

## Objetivos da Aula
- Entender o que é o HttpClient do Angular
- Configurar o HttpClient no Angular v19
- Realizar requisições HTTP básicas (GET, POST, PUT, DELETE)
- Criar um serviço para gerenciar dados
- Integrar com um banco de dados Supabase
- Implementar tratamento de erros
- Usar TypeScript para tipagem das respostas

---

## 1. Introdução ao HttpClient

O HttpClient é um serviço do Angular que permite realizar requisições HTTP para se comunicar com servidores. Ele oferece funcionalidades como:

- Requisições tipadas
- Tratamento de erros simplificado
- Interceptadores de requisição e resposta
- Utilitários robustos para testes

---

## 2. Configuração Inicial

### 2.1 Configurando o HttpClient no `app.config.ts`

No Angular v19, o HttpClient é configurado usando a função `provideHttpClient()` no arquivo de configuração da aplicação:

```typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()) // Configuração do HttpClient
  ]
};
```

### 2.2 Injetando o HttpClient em um Serviço

```typescript
// src/app/services/data.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  
  // Métodos HTTP serão implementados aqui
}
```

---

## 3. Configuração do Supabase

Para nossos exemplos, vamos usar um banco de dados hipotético no Supabase com uma tabela `users`:

### 3.1 Estrutura da Tabela `users`
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3.2 Interface TypeScript

```typescript
// src/app/models/user.interface.ts
export interface User {
  id?: number;
  name: string;
  email: string;
  created_at?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}
```

---

## 4. Implementando Requisições HTTP

### 4.1 Serviço Completo com CRUD

```typescript
// src/app/services/user.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, CreateUserRequest, UpdateUserRequest } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://your-project.supabase.co/rest/v1/users';
  private readonly apiKey = 'your-supabase-anon-key';

  private get headers() {
    return {
      'apikey': this.apiKey,
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    };
  }

  // GET - Buscar todos os usuários
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // GET - Buscar usuário por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}?id=eq.${id}`, { headers: this.headers })
      .pipe(
        map(users => users[0]),
        catchError(this.handleError)
      );
  }

  // POST - Criar novo usuário
  createUser(user: CreateUserRequest): Observable<User> {
    return this.http.post<User[]>(this.apiUrl, user, { headers: this.headers })
      .pipe(
        map(users => users[0]),
        catchError(this.handleError)
      );
  }

  // PUT - Atualizar usuário
  updateUser(id: number, user: UpdateUserRequest): Observable<User> {
    return this.http.patch<User[]>(
      `${this.apiUrl}?id=eq.${id}`, 
      user, 
      { headers: this.headers }
    ).pipe(
      map(users => users[0]),
      catchError(this.handleError)
    );
  }

  // DELETE - Deletar usuário
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=eq.${id}`, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Tratamento de erros
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
```

---

## 5. Componente para Demonstração

### 5.1 Criando o Componente

```typescript
// src/app/components/user-list/user-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User, CreateUserRequest } from '../../models/user.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Gerenciamento de Usuários</h2>
      
      <!-- Formulário para criar novo usuário -->
      <div class="form-section">
        <h3>Adicionar Novo Usuário</h3>
        <form (ngSubmit)="createUser()" #userForm="ngForm">
          <div class="form-group">
            <label for="name">Nome:</label>
            <input 
              type="text" 
              id="name" 
              [(ngModel)]="newUser.name" 
              name="name" 
              required>
          </div>
          
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              [(ngModel)]="newUser.email" 
              name="email" 
              required>
          </div>
          
          <button type="submit" [disabled]="!userForm.valid || loading">
            {{ loading ? 'Carregando...' : 'Adicionar Usuário' }}
          </button>
        </form>
      </div>

      <!-- Lista de usuários -->
      <div class="users-section">
        <h3>Usuários Cadastrados</h3>
        
        @if (loading) {
          <div class="loading">Carregando usuários...</div>
        }
        
        @if (error) {
          <div class="error">{{ error }}</div>
        }
        
        @if (users.length === 0 && !loading) {
          <div class="empty">
            Nenhum usuário encontrado.
          </div>
        }
        
        @for (user of users; track user.id) {
          <div class="user-card">
            <div class="user-info">
              <h4>{{ user.name }}</h4>
              <p>{{ user.email }}</p>
              <small>ID: {{ user.id }}</small>
            </div>
            
            <div class="user-actions">
              <button (click)="editUser(user)" class="btn-edit">Editar</button>
              <button (click)="deleteUser(user.id!)" class="btn-delete">Deletar</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .form-section, .users-section {
      margin-bottom: 30px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }
    
    button {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    
    button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
    
    button:hover:not(:disabled) {
      background-color: #0056b3;
    }
    
    .user-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin-bottom: 10px;
      border: 1px solid #eee;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    
    .user-info h4 {
      margin: 0 0 5px 0;
      color: #333;
    }
    
    .user-info p {
      margin: 0 0 5px 0;
      color: #666;
    }
    
    .user-info small {
      color: #999;
    }
    
    .user-actions {
      display: flex;
      gap: 10px;
    }
    
    .btn-edit {
      background-color: #28a745;
    }
    
    .btn-edit:hover {
      background-color: #218838;
    }
    
    .btn-delete {
      background-color: #dc3545;
    }
    
    .btn-delete:hover {
      background-color: #c82333;
    }
    
    .error {
      color: #dc3545;
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
      padding: 10px;
      margin-bottom: 15px;
    }
    
    .loading, .empty {
      text-align: center;
      color: #666;
      font-style: italic;
      padding: 20px;
    }
  `]
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);
  
  users: User[] = [];
  newUser: CreateUserRequest = { name: '', email: '' };
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;
    
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      }
    });
  }

  createUser(): void {
    if (!this.newUser.name || !this.newUser.email) {
      return;
    }
    
    this.loading = true;
    this.error = null;
    
    this.userService.createUser(this.newUser).subscribe({
      next: (user) => {
        this.users.unshift(user); // Adiciona no início da lista
        this.newUser = { name: '', email: '' }; // Limpa o formulário
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      }
    });
  }

  editUser(user: User): void {
    const newName = prompt('Novo nome:', user.name);
    if (newName && newName !== user.name) {
      this.userService.updateUser(user.id!, { name: newName }).subscribe({
        next: (updatedUser) => {
          const index = this.users.findIndex(u => u.id === user.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
        },
        error: (error) => {
          this.error = error;
        }
      });
    }
  }

  deleteUser(id: number): void {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
        },
        error: (error) => {
          this.error = error;
        }
      });
    }
  }
}
```

### 5.2 Atualizando o App Component

```typescript
// src/app/app.component.ts
import { Component } from '@angular/core';
import { UserListComponent } from './components/user-list/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserListComponent],
  template: `
    <div class="app">
      <h1>Angular v19 - HTTP Client Demo</h1>
      <app-user-list></app-user-list>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      background-color: #f5f5f5;
      padding: 20px 0;
    }
    
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }
  `]
})
export class AppComponent {
  title = 'angular-http-demo';
}
```

---

## 6. Observações Importantes

### 6.1 Configuração do Supabase

Para usar o exemplo com Supabase, você precisa:

1. Criar um projeto no [Supabase](https://supabase.com)
2. Obter a URL da API e a chave anônima
3. Configurar as políticas RLS (Row Level Security) se necessário
4. Substituir os valores no serviço:
   ```typescript
   private readonly apiUrl = 'https://SEU-PROJETO.supabase.co/rest/v1/users';
   private readonly apiKey = 'SUA-CHAVE-ANONIMA';
   ```

### 6.2 Boas Práticas

- **Tipagem**: Sempre use interfaces TypeScript para definir a estrutura dos dados
- **Tratamento de Erros**: Implemente tratamento de erros adequado usando `catchError`
- **Loading States**: Sempre forneça feedback visual durante requisições
- **Unsubscribe**: Em componentes mais complexos, lembre-se de cancelar as subscriptions no `ngOnDestroy`

### 6.3 Funcionalidades Avançadas

O HttpClient v19 também suporta:
- Interceptadores para autenticação
- Upload de arquivos
- Requisições paralelas com `forkJoin`
- Cache de requisições
- Retry automático em caso de falha

---

## 7. Exercícios Práticos

1. **Adicione validação**: Implemente validação de formulário mais robusta
2. **Paginação**: Adicione paginação à lista de usuários
3. **Busca**: Implemente funcionalidade de busca por nome ou email
4. **Interceptador**: Crie um interceptador para adicionar automaticamente os headers de autenticação
5. **Loading spinner**: Adicione um componente de loading mais elaborado

---

## Conclusão

O HttpClient do Angular v19 oferece uma API poderosa e flexível para comunicação HTTP. Com a nova configuração usando `provideHttpClient()`, o setup ficou mais simples e modular. A integração com Supabase mostra como é fácil conectar uma aplicação Angular com um backend real.

As principais vantagens incluem:
- Configuração simplificada
- Tipagem forte com TypeScript
- Tratamento de erros robusto
- Observables para programação reativa
- Facilidade de teste e manutenção