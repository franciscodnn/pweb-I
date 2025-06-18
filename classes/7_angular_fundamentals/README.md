[main](../../README.md)

# Aula 7 - Conceitos Essenciais do Angular

## 1. Fundamentos do Angular

* **Arquitetura baseada em componentes**: Todo o desenvolvimento Angular é centrado em componentes reutilizáveis
* **TypeScript por padrão**: Oferece tipagem estática para código mais seguro e produtivo
* **Abordagem declarativa**: Você descreve "o que" deve acontecer, não "como" deve ser implementado
* **Angular Template Syntax**: Nova sintaxe de templates mais intuitiva e expressiva

### Exemplo Simples:

```typescript
// app.component.ts - Componente raiz da aplicação
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>Olá Angular!</h1>'
})
export class AppComponent {
  title = 'Minha Primeira App Angular';
}
```

## 2. Componentes

* **Definição**: Unidades autônomas de interface e lógica
* **Estrutura padrão**: Cada componente possui:
  * Classe TypeScript (lógica)
  * Template HTML (visualização)
  * Estilos CSS (opcional)
  * Arquivo de teste
* **Decorador `@Component`**: Identifica a classe como um componente Angular

### Exemplo de Componente:

```typescript
// contador.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-contador',
  template: `
    <div>
      <h2>Contador: {{ contador }}</h2>
      <button (click)="incrementar()">Aumentar</button>
    </div>
  `
})
export class ContadorComponent {
  contador = 0;
  
  incrementar() {
    this.contador++;
  }
}
```

### Componentes Aninhados:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ContadorComponent } from './contador.component';

@Component({
  selector: 'app-root',
  template: `
    <h1>Aplicação Angular</h1>
    <app-contador></app-contador>
  `,
  imports: [ContadorComponent]
})
export class AppComponent {}
```

## 3. Signals

* **O que são**: Novo sistema de reatividade do Angular para gerenciar e rastrear mudanças de estado
* **Principais características**:
  * Atualizações granulares e precisas
  * Performance melhorada (menos re-renderizações)
  * API explícita (facilita entender o fluxo de dados)

### Tipos de Signals:

* **Signal de leitura**: Valores que podem ser observados (`signal()`)
* **Signal de escrita**: Valores que podem ser modificados (`signal().set()`, `signal().update()`)
* **Signal computado**: Derivados automaticamente de outros signals (`computed()`)

### Exemplo Básico:

```typescript
// contador-signal.component.ts
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-contador-signal',
  template: `
    <div>
      <h2>Contador: {{ contador() }}</h2>
      <p>Dobro: {{ contadorDobro() }}</p>
      <button (click)="incrementar()">Aumentar</button>
    </div>
  `
})
export class ContadorSignalComponent {
  // Signal primitivo
  contador = signal(0);
  
  // Signal computado (derivado)
  contadorDobro = computed(() => this.contador() * 2);
  
  incrementar() {
    // Atualizando o valor
    this.contador.update(valor => valor + 1);
  }
}
```

## 4. Templates

* **Interpolação**: Exibe valores do componente no template (`{{ expressão }}`)
* **Property Binding**: Liga propriedades HTML a valores do componente (`[propriedade]="valor"`)
* **Event Binding**: Conecta eventos do DOM a métodos do componente (`(evento)="método()"`)
* **Two-Way Binding**: Combinação de property e event binding (`[(ngModel)]="propriedade"`)
* **Controle de Fluxo**: Novas estruturas no Angular 17+ (`@if`, `@for`)

### Exemplos:

```typescript
// lista.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-lista',
  template: `
    <div>
      <!-- Interpolação -->
      <h2>{{ titulo }}</h2>
      
      <!-- Property binding -->
      <input [placeholder]="placeholderTexto">
      
      <!-- Event binding -->
      <button (click)="adicionarItem()">Adicionar item</button>
      
      <!-- Controle de fluxo @if (Angular 17+) -->
      @if (itens.length === 0) {
        <p>A lista está vazia.</p>
      }
      
      <!-- Controle de fluxo @for (Angular 17+) -->
      <ul>
        @for (item of itens; track item; let i = $index) {
          <li>{{ i + 1 }}. {{ item }}</li>
        }
      </ul>
    </div>
  `
})
export class ListaComponent {
  titulo = 'Minha Lista de Tarefas';
  placeholderTexto = 'Digite um item';
  itens = ['Item 1', 'Item 2', 'Item 3'];
  
  adicionarItem() {
    this.itens.push(`Item ${this.itens.length + 1}`);
  }
}
```

## 5. Injeção de Dependências (DI)

* **Conceito**: Sistema para fornecer instâncias de classes (serviços) aos componentes
* **Vantagens**:
  * Desacopla componentes das dependências
  * Facilita testes unitários
  * Permite compartilhar estado e lógica
* **Tokens de injeção**: Identificam dependências a serem injetadas
* **Provedores**: Determinam como criar instâncias das dependências
* **Injeção funcional**: Nova maneira de injetar serviços com `inject()`

### Exemplo de Serviço e Injeção:

```typescript
// dados.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root' // Serviço singleton disponível em toda aplicação
})
export class DadosService {
  private itens = signal<string[]>([]);
  
  adicionarItem(item: string) {
    this.itens.update(atual => [...atual, item]);
  }
  
  obterItens() {
    return this.itens;
  }
}
```

```typescript
// lista-com-servico.component.ts - Método tradicional
import { Component } from '@angular/core';
import { DadosService } from './dados.service';

@Component({
  selector: 'app-lista-com-servico',
  template: `
    <div>
      <h2>Lista com Serviço</h2>
      <input #novoItem placeholder="Novo item">
      <button (click)="adicionar(novoItem.value); novoItem.value=''">Adicionar</button>
      
      <ul>
        @for (item of itens(); track item) {
          <li>{{ item }}</li>
        }
      </ul>
    </div>
  `
})
export class ListaComServicoComponent {
  // O serviço é injetado via constructor
  constructor(private dadosService: DadosService) {}
  
  // Acesso ao signal do serviço
  itens = this.dadosService.obterItens();
  
  adicionar(item: string) {
    if (item.trim()) {
      this.dadosService.adicionarItem(item);
    }
  }
}
```

```typescript
// lista-com-servico-inject.component.ts - Usando inject()
import { Component, inject } from '@angular/core';
import { DadosService } from './dados.service';

@Component({
  selector: 'app-lista-com-servico-inject',
  template: `
    <div>
      <h2>Lista com Serviço (usando inject)</h2>
      <input #novoItem placeholder="Novo item">
      <button (click)="adicionar(novoItem.value); novoItem.value=''">Adicionar</button>
      
      <ul>
        @for (item of itens(); track item) {
          <li>{{ item }}</li>
        }
      </ul>
    </div>
  `,
  standalone: true
})
export class ListaComServicoInjectComponent {
  // Injeção funcional usando inject()
  private dadosService = inject(DadosService);
  
  // Acesso ao signal do serviço
  itens = this.dadosService.obterItens();
  
  adicionar(item: string) {
    if (item.trim()) {
      this.dadosService.adicionarItem(item);
    }
  }
}
```

## Resumo de Boas Práticas

* Mantenha os componentes pequenos e focados em uma única responsabilidade
* Use serviços para compartilhar dados e lógica entre componentes
* Prefira Signals para estado reativo em novos projetos
* Explore os novos controles de fluxo (`@if`, `@for`) disponíveis no Angular 17+
* Utilize TypeScript corretamente para maximizar segurança de tipo
* Implemente testes unitários desde o início do desenvolvimento

## Tabela Comparativa: Recursos Template do Angular

| Funcionalidade      | Sintaxe Angular                              | Exemplo                                   |
|---------------------|----------------------------------------------|-------------------------------------------|
| Interpolação        | `{{ expressão }}`                            | `<p>{{ nome }}</p>`                       |
| Property Binding    | `[propriedade]="valor"`                      | `<img [src]="urlImagem">`                 |
| Event Binding       | `(evento)="manipulador()"`                   | `<button (click)="salvar()">Salvar</button>` |
| Two-way Binding     | `[(ngModel)]="valor"`                        | `<input [(ngModel)]="nome">`              |
| Condicionais        | Moderno: `@if (condicao) { ... }`            | `@if (usuarioLogado) { <div>...</div> }`  |
|                     | Tradicional: `*ngIf="condicao"` (deprecated) | `<div *ngIf="usuarioLogado">`             |
| Loops               | Moderno: `@for (item of itens) { ... }`      | `@for (item of itens) { <li>...</li> }`   |
|                     | Tradicional: `*ngFor="let item of itens"` (deprecated) | `<li *ngFor="let item of itens">` |