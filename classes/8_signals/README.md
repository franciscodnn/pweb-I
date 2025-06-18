[main](../../README.md)

# Aula 8 - Sinais (Signals) no Angular

## 1. Introdução aos Sinais

Os Signals são uma nova API no Angular que fornece um sistema de reatividade granular. Eles permitem rastrear como e quando os dados mudam e atualizar apenas os componentes da UI que dependem desses dados específicos, resultando em aplicações mais eficientes e responsivas.

### Principais características:

- **Reatividade automática**: A UI é atualizada sempre que o valor de um sinal muda
- **Transparência**: Você pode acessar o valor de um sinal como se fosse uma propriedade comum
- **Granularidade**: Apenas as partes da UI que dependem de um sinal específico são atualizadas
- **Eficiência**: Reduz a necessidade de verificações de detecção de mudanças em toda a aplicação

## 2. Criando e Utilizando Sinais Básicos

### Criando um Sinal

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contador',
  standalone: true,
  template: `
    <h1>Contador: {{ contador() }}</h1>
    <button (click)="incrementar()">Incrementar</button>
    <button (click)="decrementar()">Decrementar</button>
  `,
})
export class ContadorComponent {
  contador = signal(0); // Cria um sinal com valor inicial 0
  
  incrementar() {
    this.contador.update(valor => valor + 1);
  }
  
  decrementar() {
    this.contador.update(valor => valor - 1);
  }
}
```

### Como acessar o valor de um Sinal

Para acessar o valor de um sinal, você chama o sinal como uma função:

```typescript
// No template
{{ contador() }}

// No código TypeScript
console.log(this.contador()); // Mostra o valor atual
```

### Métodos para atualizar Sinais

```typescript
// Método set(): Substitui completamente o valor
this.contador.set(10);

// Método update(): Atualiza o valor baseado no valor anterior
this.contador.update(valor => valor * 2);

// Método mutate(): Para objetos e arrays, permite modificar propriedades diretamente
const usuarioSinal = signal({ nome: 'João', idade: 30 });
usuarioSinal.mutate(usuario => {
  usuario.idade = 31;
});
```

## 3. Sinais Computados (Computed Signals)

Os sinais computados dependem de outros sinais e são recalculados automaticamente quando os sinais dos quais dependem mudam.

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-temperatura',
  standalone: true,
  template: `
    <h2>Conversor de temperatura</h2>
    <div>
      <label>Celsius: </label>
      <input type="number" [ngModel]="celsius()" (ngModelChange)="celsius.set($event)">
    </div>
    <div>
      <label>Fahrenheit: </label>
      <p>{{ fahrenheit() }}</p>
    </div>
  `,
})
export class TemperaturaComponent {
  celsius = signal(0);
  
  // Sinal computado que depende do sinal celsius
  fahrenheit = computed(() => (this.celsius() * 9/5) + 32);
}
```

## 4. Efeitos (Effects)

Effects permitem executar código quando sinais mudam, útil para operações colaterais como logging, chamadas de API, etc.

```typescript
import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  template: `
    <h2>Carrinho de Compras</h2>
    <button (click)="adicionarItem()">Adicionar Item</button>
    <p>Total de itens: {{ totalItens() }}</p>
  `,
})
export class CarrinhoComponent {
  itens = signal<string[]>([]);
  totalItens = computed(() => this.itens().length);
  
  constructor() {
    // Efeito é executado inicialmente e depois sempre que totalItens mudar
    effect(() => {
      console.log(`O carrinho agora tem ${this.totalItens()} item(s)`);
      
      // Você poderia fazer uma chamada ao backend aqui
      if (this.totalItens() > 0) {
        this.salvarNoLocalStorage();
      }
    });
  }
  
  adicionarItem() {
    this.itens.update(itensAtuais => [...itensAtuais, `Item ${itensAtuais.length + 1}`]);
  }
  
  salvarNoLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(this.itens()));
  }
}
```

## 5. Integrando Sinais com Formulários

```typescript
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="formulario" (ngSubmit)="onSubmit()">
      <div>
        <label for="nome">Nome:</label>
        <input id="nome" formControlName="nome">
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" formControlName="email" type="email">
      </div>
      <button type="submit">Salvar</button>
    </form>
    
    @if (usuarioSalvo()) {
      <div>
        <h3>Usuário Salvo:</h3>
        <p>Nome: {{ usuarioSalvo()?.nome }}</p>
        <p>Email: {{ usuarioSalvo()?.email }}</p>
      </div>
    }
  `,
})
export class FormularioUsuarioComponent {
  formulario = new FormGroup({
    nome: new FormControl(''),
    email: new FormControl(''),
  });
  
  usuarioSalvo = signal<{nome: string, email: string} | null>(null);
  
  onSubmit() {
    if (this.formulario.valid) {
      // Atualizando o sinal com os valores do formulário
      this.usuarioSalvo.set({
        // ajustar this.formulario.value.nome => nome.value
        // ajustar this.formulario.value.email => nome.email
        nome: this.formulario.value.nome || '',
        email: this.formulario.value.email || ''
      });
    }
  }
}
```

## 6. Benefícios dos Sinais vs. Abordagens Anteriores

### Comparação com BehaviorSubject (RxJS)

**Antes (com BehaviorSubject):**
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-contador-rxjs',
  template: `
    <h1>Contador: {{ contador }}</h1>
    <button (click)="incrementar()">Incrementar</button>
  `,
})
export class ContadorRxjsComponent implements OnInit, OnDestroy {
  private contadorSubject = new BehaviorSubject<number>(0);
  contador = 0;
  private subscription: Subscription | null = null;
  
  ngOnInit() {
    this.subscription = this.contadorSubject.subscribe(valor => {
      this.contador = valor;
    });
  }
  
  incrementar() {
    this.contadorSubject.next(this.contadorSubject.value + 1);
  }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
```

**Agora (com Signal):**
```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contador-signal',
  template: `
    <h1>Contador: {{ contador() }}</h1>
    <button (click)="incrementar()">Incrementar</button>
  `,
})
export class ContadorSignalComponent {
  contador = signal(0);
  
  incrementar() {
    this.contador.update(valor => valor + 1);
  }
}
```

### Vantagens:
- **Código mais simples e legível**
- **Sem necessidade de gerenciar subscrições**
- **Sem problemas de memory leaks**
- **Melhor desempenho devido à atualização granular**
- **Integração nativa com o sistema de detecção de mudanças do Angular**

## 7. Exemplo de Aplicação Completa com Sinais

Vamos construir uma pequena lista de tarefas usando sinais:

```typescript
import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

interface Tarefa {
  id: number;
  descricao: string;
  concluida: boolean;
}

@Component({
  selector: 'app-lista-tarefas',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  template: `
    <div class="container">
      <h1>Lista de Tarefas</h1>
      
      <div class="form-group">
        <input 
          type="text" 
          [(ngModel)]="novaTarefa" 
          placeholder="Nova tarefa..." 
          (keyup.enter)="adicionarTarefa()"
        >
        <button (click)="adicionarTarefa()">Adicionar</button>
      </div>
      
      <div class="stats">
        <p>Total: {{ totalTarefas() }}</p>
        <p>Concluídas: {{ tarefasConcluidas() }}</p>
        <p>Pendentes: {{ tarefasPendentes() }}</p>
      </div>
      
      <ul class="tarefas">
        @for (tarefa of tarefas(); track tarefa.id) {
          <li>
            <input 
              type="checkbox" 
              [checked]="tarefa.concluida" 
              (change)="alternarStatus(tarefa.id)"
            >
            <span [class.concluida]="tarefa.concluida">
              {{ tarefa.descricao }}
            </span>
            <button (click)="removerTarefa(tarefa.id)">X</button>
          </li>
        }
      </ul>
      
      @if (totalTarefas() > 0) {
        <div class="acoes">
          <button (click)="limparTarefas()">Limpar todas</button>
          <button (click)="limparConcluidas()">Remover concluídas</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .container { max-width: 500px; margin: 0 auto; padding: 20px; }
    .form-group { display: flex; margin-bottom: 20px; }
    .form-group input { flex: 1; padding: 8px; margin-right: 10px; }
    .tarefas { list-style: none; padding: 0; }
    .tarefas li { display: flex; align-items: center; padding: 8px 0; }
    .tarefas span { margin: 0 10px; flex: 1; }
    .concluida { text-decoration: line-through; color: #888; }
    .stats { display: flex; justify-content: space-between; }
    .acoes { margin-top: 20px; display: flex; justify-content: space-between; }
  `]
})
export class ListaTarefasComponent {
  tarefas = signal<Tarefa[]>([]);
  novaTarefa = '';
  proximoId = signal(1);
  
  // Estatísticas computadas
  totalTarefas = computed(() => this.tarefas().length);
  tarefasConcluidas = computed(() => 
    this.tarefas().filter(t => t.concluida).length
  );
  tarefasPendentes = computed(() => 
    this.tarefas().filter(t => !t.concluida).length
  );
  
  adicionarTarefa() {
    if (this.novaTarefa.trim()) {
      this.tarefas.update(tarefas => [
        ...tarefas,
        {
          id: this.proximoId(),
          descricao: this.novaTarefa,
          concluida: false
        }
      ]);
      
      this.proximoId.update(id => id + 1);
      this.novaTarefa = '';
    }
  }
  
  alternarStatus(id: number) {
    this.tarefas.update(tarefas =>
      tarefas.map(tarefa =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }
  
  removerTarefa(id: number) {
    this.tarefas.update(tarefas =>
      tarefas.filter(tarefa => tarefa.id !== id)
    );
  }
  
  limparTarefas() {
    this.tarefas.set([]);
  }
  
  limparConcluidas() {
    this.tarefas.update(tarefas =>
      tarefas.filter(tarefa => !tarefa.concluida)
    );
  }
}
```

## 8. Conclusão

Os Sinais no Angular fornecem uma maneira elegante e eficiente de gerenciar o estado da aplicação e a reatividade da UI. Eles oferecem:

- Código mais simples e direto
- Melhor desempenho através da atualização granular
- Melhor integração com o sistema de detecção de mudanças do Angular

Ao dominar os Sinais, você pode criar aplicações Angular mais reativas, eficientes e fáceis de manter.