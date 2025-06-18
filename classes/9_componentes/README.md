[main](../../README.md)

# Aula 9 - Componentes no Angular

## 1. Introdução aos Componentes

Os componentes são os blocos fundamentais de uma aplicação Angular. Cada componente é composto por:
- Um **template HTML** que define a interface do usuário
- Uma **classe TypeScript** que controla a lógica e dados
- **Estilos CSS** específicos para o componente
- Um **seletor** que define como o componente será usado em templates

### Estrutura básica de um componente:

```typescript
import { Component } from '@angular/core';

@Component({
  // Metadados do componente
  selector: 'app-meu-componente',
  standalone: true,
  template: `
    <h1>Olá, {{ nome }}</h1>
    <button (click)="saudar()">Saudar</button>
  `,
  styles: [`
    h1 { color: blue; }
    button { padding: 8px 16px; }
  `]
})
export class MeuComponenteComponent {
  nome = 'Mundo';
  
  saudar() {
    alert('Olá, ' + this.nome + '!');
  }
}
```

## 2. Seletores de Componentes

O seletor define como você pode usar o componente em um template HTML. Existem três tipos principais:

### Seletor de elemento (mais comum)

```typescript
@Component({
  selector: 'app-item',
  // ...
})

// Uso no template
<app-item></app-item>
```

### Seletor de atributo

```typescript
@Component({
  selector: '[appItem]',
  // ...
})

// Uso no template
<div appItem></div>
```

### Seletor de classe

```typescript
@Component({
  selector: '.app-item',
  // ...
})

// Uso no template
<div class="app-item"></div>
```

## 3. Estilização de Componentes

O Angular fornece encapsulamento de estilos, garantindo que os estilos definidos em um componente não afetem o restante da aplicação.

### Formas de adicionar estilos

#### 1. Inline no decorador @Component

```typescript
@Component({
  // ...
  styles: [`
    h1 { color: red; }
    p { font-size: 16px; }
  `]
})
```

#### 2. Arquivo externo

```typescript
@Component({
  // ...
  styleUrls: ['./meu-componente.component.css']
})
```

### Variáveis CSS e estilos específicos

```typescript
@Component({
  // ...
  styles: [`
    :host {
      display: block;
      background-color: #f5f5f5;
      padding: 20px;
    }
    
    :host(.destaque) {
      background-color: #ffffd0;
      border: 1px solid gold;
    }
    
    /* Variáveis CSS */
    :host {
      --cor-primaria: #1976d2;
      --cor-secundaria: #455a64;
    }
    
    h1 {
      color: var(--cor-primaria);
    }
  `]
})
```

## 4. Inputs - Passando Dados para Componentes

Os inputs permitem que dados sejam passados de um componente pai para um componente filho.

### Exemplo básico:

```typescript
// Componente filho (cartao.component.ts)
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cartao',
  standalone: true,
  template: `
    <div class="cartao">
      <h2>{{ titulo }}</h2>
      <p>{{ descricao }}</p>
    </div>
  `,
  styles: [`
    .cartao {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 16px;
      margin: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class CartaoComponent {
  titulo: string = input('');
  descricao: string = input('');
}

// Componente pai (app.component.ts)
import { Component } from '@angular/core';
import { CartaoComponent } from './cartao.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CartaoComponent],
  template: `
    <h1>Meus Cartões</h1>
    <app-cartao 
      titulo="Primeiro Cartão" 
      descricao="Esta é a descrição do primeiro cartão">
    </app-cartao>
    
    <app-cartao 
      titulo="Segundo Cartão" 
      descricao="Esta é a descrição do segundo cartão">
    </app-cartao>
  `
})
export class AppComponent {}
```

### Transformando inputs com setters:

```typescript
export class CartaoComponent {
  private _categoria: string = input('');
  
  set categoria(valor: string) {
    this._categoria = valor.toUpperCase();
  }
  
  get categoria(): string {
    return this._categoria;
  }
}
```

### Inputs com nomes diferentes:

```typescript
export class CartaoComponent {
  titulo: string = input('', { alias: 'cardTitle' });
  // Uso: <app-cartao cardTitle="Título"></app-cartao>
}
```

### Inputs obrigatórios (Required):

```typescript
export class CartaoComponent {
  titulo = input.required<string>();
}
```

## 5. Outputs - Emitindo Eventos para Componentes Pai

Os outputs permitem que eventos e dados sejam emitidos de um componente filho para um componente pai.

### Exemplo básico:

```typescript
import { Component, Output, EventEmitter, signal } from '@angular/core';

@Component({
  selector: 'app-contador',
  standalone: true,
  template: `
    <div>
      <p>Contagem: {{ contador() }}</p>
      <button (click)="incrementar()">Incrementar</button>
      <button (click)="resetar()">Resetar</button>
    </div>
  `
})
export class ContadorComponent {
  // Substituindo variável comum por signal
  contador = signal(0);
  
  valorAlterado = output<number>();
  foiResetado = output<void>();
  
  incrementar() {
    // Atualizando o valor do signal
    this.contador.update(valor => valor + 1);
    this.valorAlterado.emit(this.contador());
  }
  
  resetar() {
    // Definindo o valor do signal
    this.contador.set(0);
    this.foiResetado.emit();
    this.valorAlterado.emit(this.contador());
  }
}
```

## Componente pai (app.component.ts)

```typescript
import { Component, signal } from '@angular/core';
import { ContadorComponent } from './contador.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContadorComponent, CommonModule],
  template: `
    <h1>Demo de Contador</h1>
    <app-contador 
      (valorAlterado)="onValorAlterado($event)"
      (foiResetado)="onResetado()">
    </app-contador>
    
    @if (mensagem()) {
      <p>{{ mensagem() }}</p>
    }
  `
})
export class AppComponent {
  // Substituindo variável comum por signal
  mensagem = signal('');
  
  onValorAlterado(novoValor: number) {
    this.mensagem.set(`O contador foi alterado para: ${novoValor}`);
  }
  
  onResetado() {
    this.mensagem.set('O contador foi resetado!');
  }
}
```

### Outputs com nomes diferentes:

```typescript
export class ContadorComponent {
  valorAlterado = output<number>({ alias: 'counterChanged' });
  // Uso: <app-contador (counterChanged)="onChanged($event)"></app-contador>
}
```

## 6. Projeção de Conteúdo (Content Projection)

A projeção de conteúdo permite que você insira conteúdo externo dentro do template de um componente.

### Projeção simples:

```typescript
// Componente (card.component.ts)
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 16px;
      margin: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class CardComponent {}

// Uso no componente pai
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent],
  template: `
    <app-card>
      <h2>Título do Card</h2>
      <p>Este é o conteúdo projetado dentro do card.</p>
      <button>Clique aqui</button>
    </app-card>
  `
})
export class AppComponent {}
```

### Projeção múltipla com seletores:

```typescript
// Componente (dashboard-card.component.ts)
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="[card-title]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content select="[card-content]"></ng-content>
      </div>
      <div class="card-footer">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    .card-header {
      background-color: #f5f5f5;
      padding: 10px 15px;
      border-bottom: 1px solid #ddd;
      font-weight: bold;
    }
    .card-body {
      padding: 15px;
    }
    .card-footer {
      padding: 10px 15px;
      background-color: #f5f5f5;
      border-top: 1px solid #ddd;
    }
  `]
})
export class DashboardCardComponent {}

// Uso no componente pai
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardCardComponent],
  template: `
    <app-dashboard-card>
      <div card-title>
        <h3>Estatísticas</h3>
      </div>
      
      <div card-content>
        <p>Vendas totais: 10.456</p>
        <p>Usuários ativos: 2.345</p>
      </div>
      
      <div card-footer>
        <button>Ver detalhes</button>
      </div>
    </app-dashboard-card>
  `
})
export class AppComponent {}
```

### Projeção condicional com ngProjectAs:

```html
<app-dashboard-card>
  <ng-container ngProjectAs="[card-title]">
    @if (mostrarTitulo) {
      <h3>Estatísticas</h3>
    }
  </ng-container>
  
  <!-- Resto do conteúdo -->
</app-dashboard-card>
```

## 7. Exemplo Completo: Lista de Tarefas

Vamos aplicar todos os conceitos em um exemplo prático:

```typescript
// tarefa.interface.ts
export interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

// tarefa-item.component.ts
import { Component, input, output, EventEmitter } from '@angular/core';
import { Tarefa } from './tarefa.interface';

@Component({
  selector: 'app-tarefa-item',
  standalone: true,
  template: `
    <div class="tarefa-item" [class.concluida]="tarefa.concluida">
      <input
        type="checkbox"
        [checked]="tarefa.concluida"
        (change)="marcarConcluida()"
      />
      <span class="titulo">{{ tarefa.titulo }}</span>
      <button class="btn-remover" (click)="remover()">X</button>
    </div>
  `,
  styles: [`
    .tarefa-item {
      display: flex;
      align-items: center;
      padding: 10px;
      margin: 5px 0;
      background-color: #f9f9f9;
      border-radius: 4px;
    }
    
    .concluida .titulo {
      text-decoration: line-through;
      color: #888;
    }
    
    .titulo {
      flex: 1;
      margin: 0 10px;
    }
    
    .btn-remover {
      background-color: #ff4d4d;
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  `]
})
export class TarefaItemComponent {
  tarefa = input.required<Tarefa>();
  tarefaConcluida = output<number>();
  tarefaRemovida = output<number>();
  
  marcarConcluida() {
    this.tarefaConcluida.emit(this.tarefa().id);
  }
  
  remover() {
    this.tarefaRemovida.emit(this.tarefa().id);
  }
}

// tarefa-form.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarefa-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="tarefa-form">
      <input
        type="text"
        [(ngModel)]="novaTarefa"
        placeholder="Digite uma nova tarefa"
        (keyup.enter)="adicionarTarefa()"
      />
      <button (click)="adicionarTarefa()">Adicionar</button>
    </div>
  `,
  styles: [`
    .tarefa-form {
      display: flex;
      margin-bottom: 20px;
    }
    
    input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-right: 8px;
    }
    
    button {
      padding: 8px 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class TarefaFormComponent {
  novaTarefa = '';
  tarefaAdicionada = output<string>();
  
  adicionarTarefa() {
    if (this.novaTarefa.trim()) {
      this.tarefaAdicionada().emit(this.novaTarefa);
      this.novaTarefa = '';
    }
  }
}

// lista-tarefas.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaItemComponent } from './tarefa-item.component';
import { TarefaFormComponent } from './tarefa-form.component';
import { Tarefa } from './tarefa.interface';

@Component({
  selector: 'app-lista-tarefas',
  standalone: true,
  imports: [CommonModule, TarefaItemComponent, TarefaFormComponent],
  template: `
    <div class="container">
      <h1>Lista de Tarefas</h1>
      
      <app-tarefa-form
        (tarefaAdicionada)="adicionarTarefa($event)"
      ></app-tarefa-form>
      
      <div class="estatisticas">
        <p>Total: {{ tarefas.length }}</p>
        <p>Concluídas: {{ tarefasConcluidas }}</p>
        <p>Pendentes: {{ tarefas.length - tarefasConcluidas }}</p>
      </div>
      
      <div class="lista-tarefas">
        @for (tarefa of tarefas; track tarefa.id) {
          <app-tarefa-item
            [tarefa]="tarefa"
            (tarefaConcluida)="marcarConcluida($event)"
            (tarefaRemovida)="removerTarefa($event)"
          ></app-tarefa-item>
        } @empty {
          <p class="mensagem-vazia">Nenhuma tarefa adicionada.</p>
        }
      </div>
      
      @if (tarefas.length > 0) {
        <div class="acoes">
          <button class="btn-limpar" (click)="limparTarefas()">
            Limpar Todas
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    
    h1 {
      text-align: center;
      color: #333;
    }
    
    .estatisticas {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      padding: 10px;
      background-color: #f0f0f0;
      border-radius: 4px;
    }
    
    .mensagem-vazia {
      text-align: center;
      color: #888;
      padding: 20px;
    }
    
    .acoes {
      margin-top: 20px;
      text-align: center;
    }
    
    .btn-limpar {
      padding: 8px 16px;
      background-color: #ff9800;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class ListaTarefasComponent {
  tarefas: Tarefa[] = [];
  proximoId = 1;
  
  get tarefasConcluidas(): number {
    return this.tarefas.filter(t => t.concluida).length;
  }
  
  adicionarTarefa(titulo: string) {
    const novaTarefa: Tarefa = {
      id: this.proximoId++,
      titulo,
      concluida: false
    };
    
    this.tarefas = [...this.tarefas, novaTarefa];
  }
  
  marcarConcluida(id: number) {
    this.tarefas = this.tarefas.map(tarefa => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    });
  }
  
  removerTarefa(id: number) {
    this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
  }
  
  limparTarefas() {
    this.tarefas = [];
  }
}

// app.component.ts
import { Component } from '@angular/core';
import { ListaTarefasComponent } from './lista-tarefas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaTarefasComponent],
  template: `
    <div class="app-container">
      <app-lista-tarefas></app-lista-tarefas>
    </div>
  `,
  styles: [`
    .app-container {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
  `]
})
export class AppComponent {}
```

## 8. Boas Práticas para Componentes

1. **Princípio da Responsabilidade Única**: Cada componente deve ter uma única responsabilidade.

2. **Componentes Pequenos e Reutilizáveis**: Crie componentes específicos para melhor reutilização.

3. **Imutabilidade nos Dados**: Evite mutações diretas de dados, prefira criar novos objetos.

4. **Encapsulamento**: Mantenha a lógica interna do componente protegida e exponha apenas o necessário via APIs (Inputs/Outputs).

5. **Nomenclatura Consistente**:
   - Nomes de componentes: `feature.component.ts`
   - Classes: `FeatureComponent`
   - Seletores: `app-feature`

6. **Separação de Preocupações**: Mantenha o template (HTML) focado na apresentação e a classe (TS) na lógica.

7. **Use OnPush para Melhor Desempenho**:
   ```typescript
   @Component({
     // ... outras configurações
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   ```

8. **Descarregamento de Recursos**: Implemente OnDestroy para limpar recursos quando o componente for destruído.

## Conclusão

Os componentes são fundamentais no Angular e compreender como utilizá-los efetivamente é essencial para criar aplicações robustas e escaláveis. Nesta aula, cobrimos os conceitos principais:

1. Estrutura básica de componentes
2. Seletores para identificação de componentes
3. Estilização isolada
4. Inputs para comunicação de cima para baixo
5. Outputs para comunicação de baixo para cima
6. Projeção de conteúdo para composição flexível

Combinando esses conceitos, você pode criar interfaces ricas e interativas com código organizado e reutilizável.