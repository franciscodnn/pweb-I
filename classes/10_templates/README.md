[main](../../README.md)

# Aula 10 - Templates no Angular v19

## 1. Introdução aos Templates

Os templates no Angular são arquivos HTML que definem a interface do usuário de um componente. Eles combinam HTML tradicional com sintaxe específica do Angular para criar interfaces dinâmicas e reativas.

### Características principais:
- **HTML válido** com extensões específicas do Angular
- **Interpolação** para exibir dados
- **Binding de propriedades** para controlar elementos
- **Event binding** para responder a interações
- **Diretivas estruturais** para controle de fluxo
- **Pipes** para transformar dados

### Template básico:

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-exemplo-basico',
  standalone: true,
  template: `
    <div>
      <h1>{{ titulo() }}</h1>
      <p>Bem-vindo, {{ usuario().nome }}!</p>
      <p>Data atual: {{ dataAtual | date:'dd/MM/yyyy' }}</p>
    </div>
  `
})
export class ExemploBasicoComponent {
  titulo = signal('Minha Aplicação Angular v19');
  usuario = signal({ nome: 'João Silva', idade: 30 });
  dataAtual = new Date();
}
```

## 2. Data Binding (Vinculação de Dados)

O Angular oferece diferentes tipos de binding para conectar o template com a lógica do componente.

### 2.1 Interpolação (`{{ }}`)

A interpolação permite exibir valores de propriedades do componente no template:

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-interpolacao',
  standalone: true,
  template: `
    <div>
      <h2>Exemplos de Interpolação</h2>
      
      <!-- Interpolação simples -->
      <p>Nome: {{ nome() }}</p>
      <p>Idade: {{ idade() }}</p>
      
      <!-- Expressões -->
      <p>Ano de nascimento: {{ 2024 - idade() }}</p>
      <p>Nome em maiúsculas: {{ nome().toUpperCase() }}</p>
      
      <!-- Computed signals -->
      <p>Saudação: {{ saudacao() }}</p>
      
      <!-- Operador ternário -->
      <p>Status: {{ idade() >= 18 ? 'Adulto' : 'Menor de idade' }}</p>
      
      <!-- Chamada de método -->
      <p>Data formatada: {{ obterDataFormatada() }}</p>
    </div>
  `
})
export class InterpolacaoComponent {
  nome = signal('Maria Santos');
  idade = signal(25);
  
  saudacao = computed(() => `Olá, ${this.nome()}! Você tem ${this.idade()} anos.`);
  
  obterDataFormatada(): string {
    return new Date().toLocaleDateString('pt-BR');
  }
}
```

### 2.2 Property Binding (`[propriedade]`)

O property binding permite definir valores de propriedades de elementos HTML ou componentes:

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  standalone: true,
  template: `
    <div>
      <h2>Exemplos de Property Binding</h2>
      
      <!-- Binding de atributos HTML -->
      <img [src]="imagemUrl()" [alt]="imagemAlt()" [width]="larguraImagem()">
      
      <!-- Binding de propriedades -->
      <input [value]="textoInput()" [disabled]="inputDesabilitado()">
      
      <!-- Binding de classes CSS -->
      <div [class.ativo]="estaAtivo()" [class.destaque]="temDestaque()">
        Status do elemento
      </div>
      
      <!-- Binding de estilos -->
      <div [style.background-color]="corFundo()" [style.padding.px]="espacamento()">
        Elemento com estilo dinâmico
      </div>
      
      <!-- Múltiplas classes -->
      <div [class]="classesCSS()">Elemento com múltiplas classes</div>
      
      <!-- Múltiplos estilos -->
      <p [style]="estilosInline()">Texto com estilos inline</p>
      
      <!-- Controles de formulário -->
      <button [disabled]="botaoDesabilitado()" (click)="alternarBotao()">
        {{ botaoDesabilitado() ? 'Botão Desabilitado' : 'Botão Habilitado' }}
      </button>
    </div>
  `,
  styles: [`
    .ativo { border: 2px solid green; }
    .destaque { background-color: yellow; }
    .botao-primario { background-color: #007bff; color: white; }
    .texto-grande { font-size: 18px; }
  `]
})
export class PropertyBindingComponent {
  imagemUrl = signal('https://via.placeholder.com/200x150');
  imagemAlt = signal('Imagem de exemplo');
  larguraImagem = signal(200);
  
  textoInput = signal('Texto inicial');
  inputDesabilitado = signal(false);
  
  estaAtivo = signal(true);
  temDestaque = signal(false);
  
  corFundo = signal('#f0f0f0');
  espacamento = signal(20);
  
  classesCSS = signal('botao-primario texto-grande');
  estilosInline = signal('color: red; font-weight: bold;');
  
  botaoDesabilitado = signal(false);
  
  alternarBotao() {
    this.botaoDesabilitado.update(valor => !valor);
  }
}
```

### 2.3 Attribute Binding (`[attr.atributo]`)

Para definir atributos HTML que não têm propriedades correspondentes:

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-attribute-binding',
  standalone: true,
  template: `
    <div>
      <h2>Exemplos de Attribute Binding</h2>
      
      <!-- Atributos de acessibilidade -->
      <button [attr.aria-label]="botaoLabel()" [attr.aria-pressed]="botaoPressionado()">
        {{ botaoTexto() }}
      </button>
      
      <!-- Atributos data -->
      <div [attr.data-id]="elementoId()" [attr.data-categoria]="categoria()">
        Elemento com data attributes
      </div>
      
      <!-- Atributos condicionais -->
      <input [attr.required]="campoObrigatorio() ? '' : null" 
             [attr.readonly]="campoSomenteLeitura() ? '' : null">
      
      <!-- Colspan e rowspan em tabelas -->
      <table>
        <tr>
          <td [attr.colspan]="colunas()">Célula com colspan dinâmico</td>
        </tr>
      </table>
    </div>
  `
})
export class AttributeBindingComponent {
  botaoLabel = signal('Clique para alternar');
  botaoPressionado = signal(false);
  botaoTexto = signal('Alternar Estado');
  
  elementoId = signal('elemento-123');
  categoria = signal('categoria-a');
  
  campoObrigatorio = signal(true);
  campoSomenteLeitura = signal(false);
  
  colunas = signal(3);
}
```

## 3. Event Binding (Vinculação de Eventos)

O event binding permite responder a eventos do usuário ou do DOM:

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-event-binding',
  standalone: true,
  template: `
    <div>
      <h2>Exemplos de Event Binding</h2>
      
      <!-- Eventos básicos -->
      <button (click)="onClique()">Clique simples</button>
      <button (click)="onCliqueComParametro('Olá!')">Clique com parâmetro</button>
      
      <!-- Eventos de mouse -->
      <div (mouseenter)="onMouseEnter()" 
           (mouseleave)="onMouseLeave()"
           [style.background-color]="corDiv()">
        Passe o mouse aqui
      </div>
      
      <!-- Eventos de teclado -->
      <input (keyup)="onTeclaLiberada($event)"
             (keyup.enter)="onEnter()"
             (keyup.escape)="onEscape()"
             [value]="textoDigitado()">
      
      <!-- Event object -->
      <button (click)="onCliqueComEvento($event)">Clique com evento</button>
      
      <!-- Eventos de formulário -->
      <form (submit)="onSubmit($event)">
        <input type="text" [(ngModel)]="nomeFormulario" required>
        <button type="submit">Enviar</button>
      </form>
      
      <!-- Eventos customizados -->
      <input (focus)="onFocus()" (blur)="onBlur()" placeholder="Campo com foco">
      
      <!-- Resultados -->
      <div>
        <p>Última ação: {{ ultimaAcao() }}</p>
        <p>Contador de cliques: {{ contadorCliques() }}</p>
        <p>Texto digitado: {{ textoDigitado() }}</p>
        <p>Estado do foco: {{ temFoco() ? 'Com foco' : 'Sem foco' }}</p>
      </div>
    </div>
  `,
  styles: [`
    div[style*="background-color"] {
      padding: 20px;
      margin: 10px 0;
      border: 1px solid #ccc;
      transition: background-color 0.3s;
    }
  `]
})
export class EventBindingComponent {
  ultimaAcao = signal('Nenhuma ação realizada');
  contadorCliques = signal(0);
  textoDigitado = signal('');
  corDiv = signal('#f0f0f0');
  temFoco = signal(false);
  nomeFormulario = '';
  
  onClique() {
    this.contadorCliques.update(count => count + 1);
    this.ultimaAcao.set('Botão clicado');
  }
  
  onCliqueComParametro(mensagem: string) {
    this.ultimaAcao.set(`Clique com parâmetro: ${mensagem}`);
  }
  
  onMouseEnter() {
    this.corDiv.set('#e3f2fd');
    this.ultimaAcao.set('Mouse entrou na div');
  }
  
  onMouseLeave() {
    this.corDiv.set('#f0f0f0');
    this.ultimaAcao.set('Mouse saiu da div');
  }
  
  onTeclaLiberada(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    this.textoDigitado.set(target.value);
    this.ultimaAcao.set(`Tecla liberada: ${event.key}`);
  }
  
  onEnter() {
    this.ultimaAcao.set('Enter pressionado');
  }
  
  onEscape() {
    this.ultimaAcao.set('Escape pressionado');
  }
  
  onCliqueComEvento(event: MouseEvent) {
    this.ultimaAcao.set(`Clique nas coordenadas: (${event.clientX}, ${event.clientY})`);
  }
  
  onSubmit(event: Event) {
    event.preventDefault();
    this.ultimaAcao.set(`Formulário enviado com nome: ${this.nomeFormulario}`);
  }
  
  onFocus() {
    this.temFoco.set(true);
    this.ultimaAcao.set('Campo recebeu foco');
  }
  
  onBlur() {
    this.temFoco.set(false);
    this.ultimaAcao.set('Campo perdeu foco');
  }
}
```

## 4. Two-Way Binding (Vinculação Bidirecional)

O two-way binding combina property binding e event binding para sincronização automática:

```typescript
import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-two-way-binding',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <h2>Exemplos de Two-Way Binding</h2>
      
      <!-- Binding bidirecional básico -->
      <div>
        <label>Nome:</label>
        <input [(ngModel)]="nome" placeholder="Digite seu nome">
        <p>Olá, {{ nome || 'Visitante' }}!</p>
      </div>
      
      <!-- Formulário completo -->
      <form>
        <div>
          <label>Email:</label>
          <input type="email" [(ngModel)]="email" name="email">
        </div>
        
        <div>
          <label>Idade:</label>
          <input type="number" [(ngModel)]="idade" name="idade" min="0" max="120">
        </div>
        
        <div>
          <label>Cidade:</label>
          <select [(ngModel)]="cidade" name="cidade">
            <option value="">Selecione uma cidade</option>
            <option value="sao-paulo">São Paulo</option>
            <option value="rio-janeiro">Rio de Janeiro</option>
            <option value="belo-horizonte">Belo Horizonte</option>
          </select>
        </div>
        
        <div>
          <label>
            <input type="checkbox" [(ngModel)]="aceitaTermos" name="termos">
            Aceito os termos e condições
          </label>
        </div>
        
        <div>
          <label>Gênero:</label>
          <label><input type="radio" [(ngModel)]="genero" name="genero" value="masculino"> Masculino</label>
          <label><input type="radio" [(ngModel)]="genero" name="genero" value="feminino"> Feminino</label>
          <label><input type="radio" [(ngModel)]="genero" name="genero" value="outro"> Outro</label>
        </div>
        
        <div>
          <label>Comentários:</label>
          <textarea [(ngModel)]="comentarios" name="comentarios" rows="3"></textarea>
        </div>
      </form>
      
      <!-- Binding bidirecional com signals -->
      <div>
        <h3>Com Signals</h3>
        <input [value]="nomeSignal()" (input)="atualizarNome($event)">
        <p>Nome (Signal): {{ nomeSignal() }}</p>
        <p>Comprimento: {{ comprimentoNome() }}</p>
      </div>
      
      <!-- Visualização dos dados -->
      <div style="background-color: #f5f5f5; padding: 15px; margin-top: 20px;">
        <h3>Dados do Formulário:</h3>
        <pre>{{ dadosFormulario() }}</pre>
      </div>
    </div>
  `,
  styles: [`
    form div {
      margin-bottom: 15px;
    }
    
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    
    input[type="radio"] + label {
      display: inline;
      margin-left: 5px;
      margin-right: 15px;
      font-weight: normal;
    }
    
    input, select, textarea {
      width: 100%;
      max-width: 300px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    input[type="checkbox"], input[type="radio"] {
      width: auto;
    }
  `]
})
export class TwoWayBindingComponent {
  // Propriedades tradicionais para ngModel
  nome = '';
  email = '';
  idade: number | null = null;
  cidade = '';
  aceitaTermos = false;
  genero = '';
  comentarios = '';
  
  // Signals para demonstrar binding manual
  nomeSignal = signal('');
  
  // Computed signal
  comprimentoNome = computed(() => this.nomeSignal().length);
  
  // Computed para mostrar dados do formulário
  dadosFormulario = computed(() => {
    return JSON.stringify({
      nome: this.nome,
      email: this.email,
      idade: this.idade,
      cidade: this.cidade,
      aceitaTermos: this.aceitaTermos,
      genero: this.genero,
      comentarios: this.comentarios
    }, null, 2);
  });
  
  atualizarNome(event: Event) {
    const target = event.target as HTMLInputElement;
    this.nomeSignal.set(target.value);
  }
}
```

## 5. Controle de Fluxo (Angular v19)

O Angular v19 introduziu uma nova sintaxe para controle de fluxo que substitui as diretivas estruturais tradicionais.

**Control Flow no Angular v19:**
   - `@if` / `@else` para condicionais
   - `@for` para loops com tracking
   - `@switch` / `@case` para múltiplas condições


### 5.1 Estruturas Condicionais (@if)

O Angular v19 introduziu uma nova sintaxe mais limpa para condicionais usando `@if`.

#### Exemplo Básico:

```typescript
// usuario.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  template: `
    <div class="container">
      <h2>Perfil do Usuário</h2>
      
      @if (usuario.isLogado) {
        <div class="perfil-logado">
          <h3>Bem-vindo, {{ usuario.nome }}!</h3>
          <p>Email: {{ usuario.email }}</p>
          
          @if (usuario.isAdmin) {
            <button class="btn-admin">Painel Administrativo</button>
          }
        </div>
      } @else {
        <div class="login-form">
          <h3>Faça seu login</h3>
          <button (click)="login()">Entrar</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .perfil-logado { background: #e8f5e8; padding: 15px; border-radius: 5px; }
    .login-form { background: #f5f5f5; padding: 15px; border-radius: 5px; }
    .btn-admin { background: #007bff; color: white; padding: 8px 16px; border: none; border-radius: 4px; }
  `]
})
export class UsuarioComponent {
  usuario = {
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    isLogado: true,
    isAdmin: false
  };

  login() {
    this.usuario.isLogado = true;
  }
}
```

### 5.2 Loops com @for

A nova sintaxe `@for` substitui o `*ngFor` tradicional.

#### Exemplo de Lista de Produtos:

```typescript
// produtos.component.ts
import { Component } from '@angular/core';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  disponivel: boolean;
}

@Component({
  selector: 'app-produtos',
  template: `
    <div class="produtos-container">
      <h2>Lista de Produtos</h2>
      
      @if (produtos.length > 0) {
        <div class="produtos-grid">
          @for (produto of produtos; track produto.id) {
            <div class="produto-card" [class.indisponivel]="!produto.disponivel">
              <h3>{{ produto.nome }}</h3>
              <p class="categoria">{{ produto.categoria }}</p>
              <p class="preco">{{ produto.preco | currency:'BRL':'symbol':'1.2-2' }}</p>
              
              @if (produto.disponivel) {
                <button class="btn-comprar">Comprar</button>
              } @else {
                <span class="status-indisponivel">Indisponível</span>
              }
            </div>
          }
        </div>
      } @else {
        <p class="lista-vazia">Nenhum produto encontrado.</p>
      }
    </div>
  `,
  styles: [`
    .produtos-container { padding: 20px; }
    .produtos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
    .produto-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: white; }
    .produto-card.indisponivel { opacity: 0.6; background: #f9f9f9; }
    .categoria { color: #666; font-size: 0.9em; }
    .preco { font-size: 1.2em; font-weight: bold; color: #007bff; }
    .btn-comprar { background: #28a745; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; }
    .status-indisponivel { color: #dc3545; font-weight: bold; }
    .lista-vazia { text-align: center; color: #666; font-style: italic; }
  `]
})
export class ProdutosComponent {
  produtos: Produto[] = [
    { id: 1, nome: 'Smartphone', preco: 1299.99, categoria: 'Eletrônicos', disponivel: true },
    { id: 2, nome: 'Notebook', preco: 2499.99, categoria: 'Eletrônicos', disponivel: true },
    { id: 3, nome: 'Headphone', preco: 299.99, categoria: 'Acessórios', disponivel: false },
    { id: 4, nome: 'Mouse', preco: 89.99, categoria: 'Acessórios', disponivel: true }
  ];
}
```

### 5.3 Switch com @switch

Para múltiplas condições, use `@switch`.

#### Exemplo de Status de Pedido:

```typescript
// pedido-status.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-pedido-status',
  template: `
    <div class="status-container">
      <h2>Status do Pedido #{{ pedido.numero }}</h2>
      
      @switch (pedido.status) {
        @case ('pendente') {
          <div class="status-card pendente">
            <h3>⏳ Pedido Pendente</h3>
            <p>Aguardando confirmação de pagamento</p>
            <button (click)="confirmarPagamento()">Confirmar Pagamento</button>
          </div>
        }
        @case ('processando') {
          <div class="status-card processando">
            <h3>🔄 Processando</h3>
            <p>Seu pedido está sendo preparado</p>
            <div class="progress-bar">
              <div class="progress" [style.width.%]="pedido.progresso"></div>
            </div>
          </div>
        }
        @case ('enviado') {
          <div class="status-card enviado">
            <h3>🚚 Enviado</h3>
            <p>Código de rastreamento: {{ pedido.codigoRastreamento }}</p>
            <p>Previsão de entrega: {{ pedido.previsaoEntrega | date:'dd/MM/yyyy' }}</p>
          </div>
        }
        @case ('entregue') {
          <div class="status-card entregue">
            <h3>✅ Entregue</h3>
            <p>Pedido entregue em {{ pedido.dataEntrega | date:'dd/MM/yyyy HH:mm' }}</p>
            <button (click)="avaliarPedido()">Avaliar Pedido</button>
          </div>
        }
        @default {
          <div class="status-card erro">
            <h3>❌ Status Desconhecido</h3>
            <p>Entre em contato com o suporte</p>
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .status-container { padding: 20px; max-width: 500px; margin: 0 auto; }
    .status-card { padding: 20px; border-radius: 10px; margin: 10px 0; text-align: center; }
    .pendente { background: #fff3cd; border: 2px solid #ffc107; }
    .processando { background: #d1ecf1; border: 2px solid #17a2b8; }
    .enviado { background: #d4edda; border: 2px solid #28a745; }
    .entregue { background: #d1f2eb; border: 2px solid #20c997; }
    .erro { background: #f8d7da; border: 2px solid #dc3545; }
    .progress-bar { background: #e0e0e0; height: 10px; border-radius: 5px; margin: 10px 0; }
    .progress { background: #17a2b8; height: 100%; border-radius: 5px; transition: width 0.3s; }
    button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin: 5px; }
  `]
})
export class PedidoStatusComponent {
  pedido = {
    numero: 12345,
    status: 'processando' as 'pendente' | 'processando' | 'enviado' | 'entregue',
    progresso: 65,
    codigoRastreamento: 'BR123456789',
    previsaoEntrega: new Date(2024, 11, 25),
    dataEntrega: new Date(2024, 11, 23, 14, 30)
  };

  confirmarPagamento() {
    this.pedido.status = 'processando';
    this.pedido.progresso = 0;
  }

  avaliarPedido() {
    alert('Redirecionando para avaliação...');
  }
}
```

---

## 6. Pipes - Transformação de Dados

### 6.1 Pipes Nativos Essenciais
  - Formatação de texto: `uppercase`, `lowercase`, `titlecase`
  - Números e moedas: `number`, `currency`, `percent`
  - Datas: `date` com diversos formatos
  - Debug: `json`

#### Exemplo com Pipes Básicos:

```typescript
// dados-formatados.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dados-formatados',
  template: `
    <div class="exemplos-container">
      <h2>Exemplos de Pipes Nativos</h2>
      
      <div class="exemplo-card">
        <h3>Formatação de Texto</h3>
        <p><strong>Original:</strong> {{ nome }}</p>
        <p><strong>Maiúsculo:</strong> {{ nome | uppercase }}</p>
        <p><strong>Minúsculo:</strong> {{ nome | lowercase }}</p>
        <p><strong>Título:</strong> {{ nome | titlecase }}</p>
      </div>

      <div class="exemplo-card">
        <h3>Números e Moeda</h3>
        <p><strong>Decimal:</strong> {{ preco | number:'1.2-2' }}</p>
        <p><strong>Percentual:</strong> {{ desconto | percent:'1.0-1' }}</p>
        <p><strong>Moeda BRL:</strong> {{ preco | currency:'BRL':'symbol':'1.2-2' }}</p>
        <p><strong>Moeda USD:</strong> {{ precoUSD | currency:'USD':'symbol':'1.2-2' }}</p>
      </div>

      <div class="exemplo-card">
        <h3>Datas</h3>
        <p><strong>Data Completa:</strong> {{ dataAtual | date:'fullDate' }}</p>
        <p><strong>Formato BR:</strong> {{ dataAtual | date:'dd/MM/yyyy' }}</p>
        <p><strong>Com Hora:</strong> {{ dataAtual | date:'dd/MM/yyyy HH:mm:ss' }}</p>
        <p><strong>Relativo:</strong> {{ dataPassada | date:'short' }}</p>
      </div>

      <div class="exemplo-card">
        <h3>JSON Debug</h3>
        <pre>{{ usuario | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .exemplos-container { padding: 20px; }
    .exemplo-card { background: #f8f9fa; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #007bff; }
    .exemplo-card h3 { color: #007bff; margin-top: 0; }
    pre { background: #e9ecef; padding: 10px; border-radius: 4px; overflow-x: auto; }
  `]
})
export class DadosFormatadosComponent {
  nome = 'joão silva santos';
  preco = 1299.99;
  precoUSD = 259.99;
  desconto = 0.15;
  dataAtual = new Date();
  dataPassada = new Date(2024, 10, 15);
  
  usuario = {
    id: 1,
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    ativo: true,
    perfis: ['usuario', 'cliente']
  };
}
```

### 6.2 Pipe Customizado
  - Interface `PipeTransform`
  - Decorador `@Pipe`
  - Implementação personalizada

#### Criando um Pipe para Destacar Texto:

```typescript
// highlight.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): string {
    if (!search || !text) {
      return text;
    }
    
    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}
```

#### Pipe para Truncar Texto:

```typescript
// truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, suffix: string = '...'): string {
    if (!value) return '';
    
    if (value.length <= limit) {
      return value;
    }
    
    return value.substring(0, limit) + suffix;
  }
}
```

#### Usando os Pipes Customizados:

```typescript
// busca-artigos.component.ts
import { Component } from '@angular/core';
import { HighlightPipe } from './pipes/highlight.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

@Component({
  selector: 'app-busca-artigos',
  standalone: true,
  imports: [HighlightPipe, TruncatePipe],
  template: `
    <div class="busca-container">
      <h2>Busca de Artigos</h2>
      
      <div class="busca-input">
        <input 
          type="text" 
          [(ngModel)]="termoBusca" 
          placeholder="Digite sua busca..."
          class="input-busca">
      </div>

      <div class="resultados">
        @for (artigo of artigos; track artigo.id) {
          <div class="artigo-card">
            <h3 [innerHTML]="artigo.titulo | highlight:termoBusca"></h3>
            <p class="resumo" [innerHTML]="artigo.resumo | truncate:120 | highlight:termoBusca"></p>
            <div class="meta">
              <span class="autor">Por: {{ artigo.autor }}</span>
              <span class="data">{{ artigo.dataPublicacao | date:'dd/MM/yyyy' }}</span>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .busca-container { padding: 20px; max-width: 800px; margin: 0 auto; }
    .busca-input { margin-bottom: 20px; }
    .input-busca { width: 100%; padding: 12px; font-size: 16px; border: 2px solid #ddd; border-radius: 8px; }
    .input-busca:focus { outline: none; border-color: #007bff; }
    .artigo-card { background: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .artigo-card h3 { color: #007bff; margin-top: 0; }
    .resumo { color: #666; line-height: 1.6; }
    .meta { display: flex; justify-content: space-between; margin-top: 15px; font-size: 0.9em; color: #666; }
    :global(mark) { background: yellow; padding: 2px 4px; border-radius: 3px; }
  `]
})
export class BuscaArtigosComponent {
  termoBusca = '';
  
  artigos = [
    {
      id: 1,
      titulo: 'Introdução ao Angular 19',
      resumo: 'Angular 19 trouxe muitas novidades interessantes, incluindo melhorias significativas no sistema de templates e uma nova sintaxe para control flow que torna o código mais limpo e legível.',
      autor: 'Maria Santos',
      dataPublicacao: new Date(2024, 11, 1)
    },
    {
      id: 2,
      titulo: 'Pipes Customizados no Angular',
      resumo: 'Os pipes são uma ferramenta poderosa para transformar dados nos templates do Angular. Neste artigo, vamos aprender como criar pipes customizados para necessidades específicas do seu projeto.',
      autor: 'João Silva',
      dataPublicacao: new Date(2024, 10, 28)
    },
    {
      id: 3,
      titulo: 'Control Flow: @if, @for e @switch',
      resumo: 'A nova sintaxe de control flow do Angular oferece uma maneira mais intuitiva de trabalhar com condicionais e loops nos templates, substituindo as diretivas estruturais tradicionais.',
      autor: 'Ana Costa',
      dataPublicacao: new Date(2024, 10, 25)
    }
  ];
}
```

---

## 7. Exercício Prático

### Desafio: Sistema de Dashboard

Crie um componente que combine control flow e pipes para exibir um dashboard com:

1. **Lista de vendas** com filtro por status
2. **Estatísticas** formatadas com pipes
3. **Gráfico simples** usando condicionais

```typescript
// dashboard.component.ts
import { Component } from '@angular/core';

interface Venda {
  id: number;
  cliente: string;
  valor: number;
  data: Date;
  status: 'pendente' | 'aprovada' | 'cancelada';
}

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <h1>Dashboard de Vendas</h1>
      
      <!-- Filtros -->
      <div class="filtros">
        <button 
          (click)="filtroAtivo = 'todos'"
          [class.ativo]="filtroAtivo === 'todos'">
          Todos
        </button>
        <button 
          (click)="filtroAtivo = 'pendente'"
          [class.ativo]="filtroAtivo === 'pendente'">
          Pendentes
        </button>
        <button 
          (click)="filtroAtivo = 'aprovada'"
          [class.ativo]="filtroAtivo === 'aprovada'">
          Aprovadas
        </button>
      </div>

      <!-- Estatísticas -->
      <div class="stats">
        <div class="stat-card">
          <h3>Total de Vendas</h3>
          <p class="stat-value">{{ calcularTotal() | currency:'BRL':'symbol':'1.2-2' }}</p>
        </div>
        <div class="stat-card">
          <h3>Vendas Este Mês</h3>
          <p class="stat-value">{{ vendasMes }}</p>
        </div>
        <div class="stat-card">
          <h3>Taxa de Conversão</h3>
          <p class="stat-value">{{ taxaConversao | percent:'1.1-1' }}</p>
        </div>
      </div>

      <!-- Lista de Vendas -->
      <div class="vendas-lista">
        @for (venda of vendasFiltradas(); track venda.id) {
          <div class="venda-item" [attr.data-status]="venda.status">
            <div class="venda-info">
              <h4>{{ venda.cliente | titlecase }}</h4>
              <p>{{ venda.data | date:'dd/MM/yyyy' }}</p>
            </div>
            <div class="venda-valor">
              {{ venda.valor | currency:'BRL':'symbol':'1.2-2' }}
            </div>
            <div class="venda-status">
              @switch (venda.status) {
                @case ('pendente') {
                  <span class="badge pendente">⏳ Pendente</span>
                }
                @case ('aprovada') {
                  <span class="badge aprovada">✅ Aprovada</span>
                }
                @case ('cancelada') {
                  <span class="badge cancelada">❌ Cancelada</span>
                }
              }
            </div>
          </div>
        } @empty {
          <p class="lista-vazia">Nenhuma venda encontrada para o filtro selecionado.</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding: 20px; max-width: 1200px; margin: 0 auto; }
    .filtros { margin: 20px 0; display: flex; gap: 10px; }
    .filtros button { padding: 10px 20px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 5px; }
    .filtros button.ativo { background: #007bff; color: white; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
    .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
    .stat-value { font-size: 2em; font-weight: bold; color: #007bff; margin: 10px 0; }
    .vendas-lista { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .venda-item { display: flex; align-items: center; padding: 15px; border-bottom: 1px solid #eee; }
    .venda-item:last-child { border-bottom: none; }
    .venda-info { flex: 1; }
    .venda-info h4 { margin: 0; color: #333; }
    .venda-info p { margin: 5px 0 0; color: #666; font-size: 0.9em; }
    .venda-valor { font-size: 1.2em; font-weight: bold; margin: 0 20px; }
    .badge { padding: 5px 10px; border-radius: 15px; font-size: 0.8em; font-weight: bold; }
    .badge.pendente { background: #fff3cd; color: #856404; }
    .badge.aprovada { background: #d4edda; color: #155724; }
    .badge.cancelada { background: #f8d7da; color: #721c24; }
    .lista-vazia { text-align: center; padding: 40px; color: #666; font-style: italic; }
  `]
})
export class DashboardComponent {
  filtroAtivo: 'todos' | 'pendente' | 'aprovada' | 'cancelada' = 'todos';
  vendasMes = 47;
  taxaConversao = 0.68;

  vendas: Venda[] = [
    { id: 1, cliente: 'maria silva', valor: 1299.99, data: new Date(2024, 11, 20), status: 'aprovada' },
    { id: 2, cliente: 'joão santos', valor: 899.50, data: new Date(2024, 11, 19), status: 'pendente' },
    { id: 3, cliente: 'ana costa', valor: 2100.00, data: new Date(2024, 11, 18), status: 'aprovada' },
    { id: 4, cliente: 'pedro oliveira', valor: 650.75, data: new Date(2024, 11, 17), status: 'cancelada' },
    { id: 5, cliente: 'julia fernandes', valor: 1850.25, data: new Date(2024, 11, 16), status: 'aprovada' }
  ];

  vendasFiltradas(): Venda[] {
    if (this.filtroAtivo === 'todos') {
      return this.vendas;
    }
    return this.vendas.filter(venda => venda.status === this.filtroAtivo);
  }

  calcularTotal(): number {
    return this.vendas
      .filter(venda => venda.status === 'aprovada')
      .reduce((total, venda) => total + venda.valor, 0);
  }
}
```

---