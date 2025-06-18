[main](../../README.md)

# Aula 13 - Rotas no Angular

## Índice
1. [Introdução ao Roteamento](#introdução-ao-roteamento)
2. [Configuração Básica](#configuração-básica)
3. [Definindo Rotas](#definindo-rotas)
4. [Router Outlet](#router-outlet)
5. [Navegação com RouterLink](#navegação-com-routerlink)
6. [Navegação Programática](#navegação-programática)
7. [Parâmetros de Rota](#parâmetros-de-rota)
8. [Query Parameters](#query-parameters)
9. [Rotas Aninhadas](#rotas-aninhadas)
10. [Lazy Loading](#lazy-loading)
11. [Exemplo Prático Completo](#exemplo-prático-completo)

---

## 1. Introdução ao Roteamento

O roteamento no Angular permite mudar o que o usuário vê mostrando ou ocultando partes da exibição que correspondem a componentes específicos, em vez de buscar uma nova página no servidor.

Uma rota é um objeto que define qual componente deve ser renderizado para um caminho ou padrão de URL específico.

---

## 2. Configuração Básica

### Estrutura do Projeto
```
src/
  app/
    components/
      home/
        home.component.ts
      about/
        about.component.ts
      users/
        users.component.ts
        user-detail.component.ts
    app.routes.ts
    app.component.ts
    app.config.ts
```

### Configuração do Aplicativo

**app.config.ts**
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
```

---

## 3. Definindo Rotas

### Rotas Básicas

**app.routes.ts**
```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/users/user-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'about', component: AboutComponent, title: 'Sobre' },
  { path: 'users', component: UsersComponent, title: 'Usuários' },
  { path: 'users/:id', component: UserDetailComponent, title: 'Detalhes do Usuário' },
  { path: '**', redirectTo: '' } // Rota wildcard para 404
];
```

### Tipos de Rotas

#### 1. Rotas Estáticas
```typescript
{ path: 'about', component: AboutComponent }
{ path: 'contact', component: ContactComponent }
```

#### 2. Rotas com Parâmetros
```typescript
{ path: 'users/:id', component: UserDetailComponent }
{ path: 'products/:category/:id', component: ProductDetailComponent }
```

#### 3. Rotas de Redirecionamento
```typescript
{ path: 'old-path', redirectTo: '/new-path' }
{ path: '', redirectTo: '/home', pathMatch: 'full' }
```

#### 4. Rota Wildcard (404)
```typescript
{ path: '**', component: NotFoundComponent }
```

---

## 4. Router Outlet

O RouterOutlet é uma diretiva que marca o local onde o roteador deve renderizar o componente para a URL atual.

**app.component.html**
```html
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">Sobre</a>
  <a routerLink="/users">Usuários</a>
</nav>

<main>
  <router-outlet></router-outlet>
</main>
```

**app.component.ts**
```typescript
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'meu-app';
}
```

---

## 5. Navegação com RouterLink

### Navegação Básica

```html
<!-- Navegação simples -->
<a routerLink="/home">Home</a>
<a routerLink="/about">Sobre</a>

<!-- Navegação com parâmetros -->
<a [routerLink]="['/users', userId]">Ver Usuário</a>

<!-- Navegação com query parameters -->
<a [routerLink]="['/products']" [queryParams]="{category: 'electronics', page: 1}">
  Produtos Eletrônicos
</a>
```

### RouterLinkActive

```html
<nav>
  <a routerLink="/" 
     routerLinkActive="active"
     [routerLinkActiveOptions]="{exact: true}">
    Home
  </a>
  <a routerLink="/about" 
     routerLinkActive="active">
    Sobre
  </a>
  <a routerLink="/users" 
     routerLinkActive="active">
    Usuários
  </a>
</nav>
```

**CSS**
```css
.active {
  font-weight: bold;
  color: #007bff;
  text-decoration: underline;
}
```

---

## 6. Navegação Programática

### Usando Router Service

```typescript
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="goToHome()">Ir para Home</button>
    <button (click)="goToUser(123)">Ver Usuário 123</button>
    <button (click)="goToProducts()">Buscar Produtos</button>
  `
})
export class ExampleComponent {
  private router = inject(Router);

  goToHome() {
    this.router.navigate(['/']);
  }

  goToUser(userId: number) {
    this.router.navigate(['/users', userId]);
  }

  goToProducts() {
    this.router.navigate(['/products'], {
      queryParams: { category: 'books', sort: 'price' }
    });
  }

  // Navegação com URL completa
  goToSearch() {
    this.router.navigateByUrl('/search?q=angular&sort=date');
  }
}
```

---

## 7. Parâmetros de Rota

### Lendo Parâmetros

**user-detail.component.ts**
```typescript
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  template: `
    <h1>Detalhes do Usuário</h1>
    <p>ID do Usuário: {{ userId() }}</p>
    <p>Nome: {{ userName() }}</p>
  `
})
export class UserDetailComponent {
  userId = signal<string>('');
  userName = signal<string>('');
  
  private route = inject(ActivatedRoute);

  constructor() {
    // Usando snapshot para valores únicos
    this.userId.set(this.route.snapshot.params['id']);
    
    // Usando observable para valores que podem mudar
    this.route.params.subscribe(params => {
      this.userId.set(params['id']);
      this.loadUser(params['id']);
    });
  }

  private loadUser(id: string) {
    // Simular carregamento de dados
    this.userName.set(`Usuário ${id}`);
  }
}
```

---

## 8. Query Parameters

### Lendo Query Parameters

**products.component.ts**
```typescript
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  template: `
    <h1>Produtos</h1>
    
    <div>
      <label>Categoria:</label>
      <select (change)="updateCategory($event)">
        <option value="">Todas</option>
        <option value="electronics">Eletrônicos</option>
        <option value="books">Livros</option>
        <option value="clothing">Roupas</option>
      </select>
    </div>

    <div>
      <label>Ordenar por:</label>
      <select (change)="updateSort($event)">
        <option value="name">Nome</option>
        <option value="price">Preço</option>
        <option value="date">Data</option>
      </select>
    </div>

    <div>
      <p>Categoria atual: {{ currentCategory() }}</p>
      <p>Ordenação atual: {{ currentSort() }}</p>
    </div>
  `
})
export class ProductsComponent {
  currentCategory = signal<string>('');
  currentSort = signal<string>('name');
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.route.queryParams.subscribe(params => {
      this.currentCategory.set(params['category'] || '');
      this.currentSort.set(params['sort'] || 'name');
    });
  }

  updateCategory(event: Event) {
    const category = (event.target as HTMLSelectElement).value;
    this.router.navigate([], {
      queryParams: { category: category || null },
      queryParamsHandling: 'merge'
    });
  }

  updateSort(event: Event) {
    const sort = (event.target as HTMLSelectElement).value;
    this.router.navigate([], {
      queryParams: { sort },
      queryParamsHandling: 'merge'
    });
  }
}
```

---

## 9. Rotas Aninhadas

### Configuração de Rotas Filhas

**app.routes.ts**
```typescript
export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardHomeComponent },    // /dashboard
      { path: 'profile', component: ProfileComponent },   // /dashboard/profile
      { path: 'settings', component: SettingsComponent }  // /dashboard/settings
    ]
  }
];
```

### Componente Pai com Router Outlet

**dashboard.component.html**
```html
<div class="dashboard">
  <nav class="sidebar">
    <h2>Dashboard</h2>
    <ul>
      <li><a routerLink="" routerLinkActive="active">Home</a></li>
      <li><a routerLink="profile" routerLinkActive="active">Perfil</a></li>
      <li><a routerLink="settings" routerLinkActive="active">Configurações</a></li>
    </ul>
  </nav>
  
  <main class="content">
    <router-outlet></router-outlet>
  </main>
</div>
```

**dashboard.component.ts**
```typescript
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {}
```

---

## 10. Lazy Loading

### Configuração de Lazy Loading

**app.routes.ts**
```typescript
export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin.component')
      .then(m => m.AdminComponent)
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes')
      .then(m => m.PRODUCTS_ROUTES)
  }
];
```

### Rotas do Módulo de Produtos

**features/products/products.routes.ts**
```typescript
import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./products-list.component')
      .then(m => m.ProductsListComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./product-detail.component')
      .then(m => m.ProductDetailComponent)
  }
];
```

---

## 11. Exemplo Prático Completo

### Estrutura do Projeto
```
src/app/
├── components/
│   ├── home/
│   │   └── home.component.ts
│   ├── about/
│   │   └── about.component.ts
│   ├── users/
│   │   ├── users.component.ts
│   │   └── user-detail.component.ts
│   └── not-found/
│       └── not-found.component.ts
├── app.component.ts
├── app.routes.ts
└── app.config.ts
```

### Componente Home

**home.component.ts**
```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Bem-vindo ao Angular v19!</h1>
    <p>Este é um exemplo de roteamento básico.</p>
    
    <div class="actions">
      <a routerLink="/about" class="btn">Sobre Nós</a>
      <a routerLink="/users" class="btn">Ver Usuários</a>
    </div>
  `,
  styles: [`
    .actions {
      margin-top: 20px;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      margin: 5px;
      background: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
  `]
})
export class HomeComponent {}
```

### Componente Users

**users.component.ts**
```typescript
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Lista de Usuários</h1>
    
    <div class="users-grid">
      @for (user of users(); track user.id) {
        <div class="user-card">
          <h3>{{ user.name }}</h3>
          <p>{{ user.email }}</p>
          <a [routerLink]="['/users', user.id]" class="btn">Ver Detalhes</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .user-card {
      border: 1px solid #ddd;
      padding: 20px;
      border-radius: 8px;
    }
    .btn {
      display: inline-block;
      padding: 8px 16px;
      background: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
  `]
})
export class UsersComponent {
  users = signal<User[]>([
    { id: 1, name: 'João Silva', email: 'joao@email.com' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com' },
    { id: 3, name: 'Pedro Oliveira', email: 'pedro@email.com' }
  ]);
}
```

### Componente User Detail

**user-detail.component.ts**
```typescript
import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
}

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  template: `
    @if (user()) {
      <div>
        <h1>{{ user()?.name }}</h1>
        <p><strong>Email:</strong> {{ user()?.email }}</p>
        <p><strong>Bio:</strong> {{ user()?.bio }}</p>
        
        <div class="actions">
          <button (click)="goBack()" class="btn">Voltar</button>
          <button (click)="editUser()" class="btn btn-primary">Editar</button>
        </div>
      </div>
    } @else {
      <p>Carregando usuário...</p>
    }
  `,
  styles: [`
    .actions {
      margin-top: 20px;
    }
    .btn {
      padding: 10px 20px;
      margin-right: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-primary {
      background: #007bff;
      color: white;
    }
  `]
})
export class UserDetailComponent {
  user = signal<User | null>(null);
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Dados mockados
  private users: User[] = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', bio: 'Desenvolvedor Frontend' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', bio: 'Designer UX/UI' },
    { id: 3, name: 'Pedro Oliveira', email: 'pedro@email.com', bio: 'Desenvolvedor Backend' }
  ];

  constructor() {
    this.route.params.subscribe(params => {
      const userId = Number(params['id']);
      this.loadUser(userId);
    });
  }

  private loadUser(id: number) {
    // Simular delay de carregamento
    setTimeout(() => {
      const user = this.users.find(u => u.id === id);
      this.user.set(user || null);
    }, 500);
  }

  goBack() {
    this.router.navigate(['/users']);
  }

  editUser() {
    if (this.user()) {
      this.router.navigate(['/users', this.user()!.id, 'edit']);
    }
  }
}
```

### Componente Principal

**app.component.ts**
```typescript
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <h2>Meu App Angular v19</h2>
      </div>
      <ul class="nav-links">
        <li>
          <a routerLink="/" 
             routerLinkActive="active"
             [routerLinkActiveOptions]="{exact: true}">
            Home
          </a>
        </li>
        <li>
          <a routerLink="/about" 
             routerLinkActive="active">
            Sobre
          </a>
        </li>
        <li>
          <a routerLink="/users" 
             routerLinkActive="active">
            Usuários
          </a>
        </li>
      </ul>
    </nav>
    
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar {
      background: #333;
      color: white;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nav-brand h2 {
      margin: 0;
    }
    .nav-links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 20px;
    }
    .nav-links a {
      color: white;
      text-decoration: none;
      padding: 10px 15px;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .nav-links a:hover {
      background: #555;
    }
    .nav-links a.active {
      background: #007bff;
    }
    .main-content {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {}
```

---

## Resumo dos Conceitos Principais

1. **Configuração**: Use `provideRouter(routes)` no `app.config.ts`
2. **Definição de Rotas**: Configure rotas no arquivo `app.routes.ts`
3. **Router Outlet**: Use `<router-outlet>` para exibir componentes
4. **Navegação Declarativa**: Use `routerLink` nos templates
5. **Navegação Programática**: Use `Router.navigate()` ou `Router.navigateByUrl()`
6. **Parâmetros**: Leia parâmetros com `ActivatedRoute`
7. **Query Parameters**: Gerencie parâmetros de consulta para filtros e estado
8. **Rotas Aninhadas**: Crie hierarquias de rotas com `children`
9. **Lazy Loading**: Carregue componentes sob demanda com `loadComponent`
10. **Estado Ativo**: Use `routerLinkActive` para destacar links ativos

### Comandos Angular CLI Úteis

```bash
# Gerar componente
ng generate component components/users

# Gerar componente standalone
ng generate component components/users --standalone

# Gerar guard
ng generate guard guards/auth

# Gerar resolver
ng generate resolver resolvers/user-data
```
