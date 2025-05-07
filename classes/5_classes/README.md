[main](../../README.md)

# Aula 5 - Classes em TypeScript

## Introdução às Classes
- Classes são uma forma de criar objetos com propriedades e métodos específicos
- Introduzidas no ECMAScript 2015 (ES6) e estendidas pelo TypeScript
- Fornecem uma sintaxe mais clara para Programação Orientada a Objetos (POO)

```typescript
// Exemplo básico de uma classe
class Pessoa {
  nome: string;
  idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  apresentar(): string {
    return `Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`;
  }
}

const pessoa = new Pessoa("Maria", 25);
console.log(pessoa.apresentar()); // Saída: Olá, meu nome é Maria e tenho 25 anos.
```

## Definição Básica de Classes
- Estrutura básica: `class NomeClasse { ... }`
- Podem conter propriedades (dados) e métodos (funções)
- Instanciadas usando a palavra-chave `new`: `const instancia = new NomeClasse()`

## Membros de Classe

### Campos (Fields)
- São declarações que criam propriedades em uma instância da classe
- Podem ter inicializadores que são executados automaticamente
- Sintaxe: `nomePropriedade: tipo = valorInicial`
- Podem ser precedidos por modificadores como `readonly` 

```typescript
class Produto {
  // Campo com valor inicial
  nome: string = "Produto sem nome";
  
  // Campo readonly
  readonly codigo: string;
  
  // Campo sem inicializador
  preco: number;
  
  constructor(codigo: string, preco: number) {
    this.codigo = codigo;
    this.preco = preco;
  }
}

const produto = new Produto("P001", 29.99);
console.log(produto.nome); // Saída: Produto sem nome
// produto.codigo = "P002"; // Erro: não pode atribuir a um campo readonly
```

### Construtores
- Método especial executado quando uma classe é instanciada
- Sintaxe: `constructor(parametros) { ... }`
- Usado para inicializar propriedades da classe
- Pode utilizar parâmetros com modificadores de acesso para criar e inicializar propriedades automaticamente
- Construtores não podem ter tipos de retorno e não podem usar decoradores

```typescript
// Usando modificadores de acesso nos parâmetros do construtor
class Usuario {
  constructor(
    public username: string,
    private password: string,
    readonly id: number
  ) {
    // O código acima automaticamente cria e inicializa as propriedades
  }
  
  verificarSenha(senha: string): boolean {
    return this.password === senha;
  }
}

const usuario = new Usuario("joao123", "senha123", 1);
console.log(usuario.username); // Saída: joao123
// console.log(usuario.password); // Erro: propriedade privada
console.log(usuario.id); // Saída: 1
```

### Métodos
- Funções definidas dentro de uma classe
- Sintaxe similar a funções regulares, mas sem a palavra-chave `function`
- Podem acessar outros membros da classe usando `this`

```typescript
class Calculadora {
  private resultado: number = 0;
  
  somar(valor: number): void {
    this.resultado += valor;
  }
  
  subtrair(valor: number): void {
    this.resultado -= valor;
  }
  
  obterResultado(): number {
    return this.resultado;
  }
  
  // Método com parâmetros opcionais
  multiplicarOuDividir(valor: number, multiplicar: boolean = true): void {
    if (multiplicar) {
      this.resultado *= valor;
    } else {
      this.resultado /= valor;
    }
  }
}

const calc = new Calculadora();
calc.somar(10);
calc.subtrair(2);
calc.multiplicarOuDividir(2); // Multiplica por 2
console.log(calc.obterResultado()); // Saída: 16
```

## Modificadores de Acesso
- **public**: acessível em qualquer lugar (padrão)
- **private**: acessível apenas dentro da própria classe
- **protected**: acessível dentro da classe e suas subclasses
- **readonly**: propriedade que não pode ser alterada após a inicialização

```typescript
class Animal {
  public nome: string;          // Acessível em qualquer lugar
  private dnaId: string;        // Acessível apenas dentro desta classe
  protected especie: string;    // Acessível nesta classe e em subclasses
  readonly dataNascimento: Date; // Não pode ser modificado após inicialização
  
  constructor(nome: string, dnaId: string, especie: string, dataNascimento: Date) {
    this.nome = nome;
    this.dnaId = dnaId;
    this.especie = especie;
    this.dataNascimento = dataNascimento;
  }
  
  public fazerBarulho(): string {
    return "Som genérico de animal";
  }
  
  private obterIdentificacaoUnica(): string {
    return `${this.dnaId}-${this.especie}`;
  }
  
  protected obterDetalhes(): string {
    return `Animal: ${this.nome}, Espécie: ${this.especie}, ID: ${this.dnaId}`;
  }
}

class Cachorro extends Animal {
  constructor(nome: string, dnaId: string, dataNascimento: Date) {
    super(nome, dnaId, "Canis familiaris", dataNascimento);
  }
  
  public fazerBarulho(): string {
    return "Au au!";
  }
  
  public mostrarDetalhes(): string {
    return this.obterDetalhes(); // Pode acessar método protected da superclasse
    // return this.dnaId; // Erro: não pode acessar propriedade private da superclasse
  }
}

const rex = new Cachorro("Rex", "D12345", new Date(2020, 0, 15));
console.log(rex.nome); // Saída: Rex
console.log(rex.fazerBarulho()); // Saída: Au au!
// console.log(rex.dnaId); // Erro: propriedade privada
// console.log(rex.especie); // Erro: propriedade protected
// rex.dataNascimento = new Date(); // Erro: propriedade readonly
```

## Propriedades
- **Getters e Setters**: métodos especiais para controlar o acesso às propriedades
- Sintaxe: `get propriedade() { ... }` e `set propriedade(valor) { ... }`
- Permitem adicionar lógica ao acessar ou modificar valores

```typescript
class Conta {
  private _saldo: number = 0;
  
  // Getter
  get saldo(): number {
    console.log("Saldo consultado");
    return this._saldo;
  }
  
  // Setter
  set saldo(valor: number) {
    if (valor < 0) {
      console.error("Não é possível definir um saldo negativo");
      return;
    }
    console.log(`Saldo alterado de ${this._saldo} para ${valor}`);
    this._saldo = valor;
  }
  
  // Propriedade somente leitura (apenas getter)
  get saldoEmDolar(): number {
    // Taxa de câmbio fictícia
    return this._saldo / 5;
  }
}

const minhaConta = new Conta();
minhaConta.saldo = 1000; // Chama o setter
console.log(minhaConta.saldo); // Chama o getter, Saída: 1000
console.log(minhaConta.saldoEmDolar); // Saída: 200
minhaConta.saldo = -100; // Erro no console, saldo não é alterado
```

## Membros Estáticos
- Pertencem à própria classe, não às instâncias
- Declarados com a palavra-chave `static`
- Acessados através do nome da classe: `NomeClasse.membroEstatico`
- Úteis para propriedades e métodos compartilhados entre todas as instâncias

```typescript
class Utilitarios {
  // Propriedade estática
  static readonly PI: number = 3.14159;
  
  // Método estático
  static calcularAreaCirculo(raio: number): number {
    return Utilitarios.PI * raio * raio;
  }
  
  // Método estático que usa outro membro estático
  static calcularCircunferenciaCirculo(raio: number): number {
    return 2 * Utilitarios.PI * raio;
  }
  
  // Propriedade estática com getter
  static get versao(): string {
    return "1.0.0";
  }
}

// Uso sem instanciar a classe
console.log(Utilitarios.PI); // Saída: 3.14159
console.log(Utilitarios.calcularAreaCirculo(5)); // Saída: 78.53975
console.log(Utilitarios.versao); // Saída: 1.0.0
```

## Herança
- Permite que uma classe (subclasse) herde propriedades e métodos de outra (superclasse)
- Sintaxe: `class Subclasse extends Superclasse { ... }`
- A subclasse pode chamar o construtor da superclasse usando `super()`
- Métodos podem ser sobrescritos na subclasse

```typescript
class Veiculo {
  constructor(
    protected marca: string, 
    protected modelo: string, 
    protected ano: number
  ) {}
  
  descricao(): string {
    return `${this.marca} ${this.modelo} (${this.ano})`;
  }
  
  idade(anoAtual: number = new Date().getFullYear()): number {
    return anoAtual - this.ano;
  }
}

class Carro extends Veiculo {
  constructor(
    marca: string,
    modelo: string,
    ano: number,
    private numPortas: number
  ) {
    // Chama o construtor da classe pai
    super(marca, modelo, ano);
  }
  
  // Sobrescreve o método da classe pai
  descricao(): string {
    // Usa o método da classe pai com super
    return `${super.descricao()} - ${this.numPortas} portas`;
  }
  
  // Método específico desta subclasse
  abrirPortas(): string {
    return `Abrindo ${this.numPortas} portas`;
  }
}

class Moto extends Veiculo {
  constructor(
    marca: string,
    modelo: string,
    ano: number,
    private cilindradas: number
  ) {
    super(marca, modelo, ano);
  }
  
  descricao(): string {
    return `${super.descricao()} - ${this.cilindradas}cc`;
  }
}

const meuCarro = new Carro("Toyota", "Corolla", 2020, 4);
const minhaMoto = new Moto("Honda", "CB500", 2022, 500);

console.log(meuCarro.descricao()); // Saída: Toyota Corolla (2020) - 4 portas
console.log(minhaMoto.descricao()); // Saída: Honda CB500 (2022) - 500cc
console.log(meuCarro.idade()); // Saída: 5 (considerando 2025)
console.log(meuCarro.abrirPortas()); // Saída: Abrindo 4 portas
```

## Classes Abstratas
- Definidas com a palavra-chave `abstract`
- Não podem ser instanciadas diretamente
- Servem como base para outras classes
- Podem conter métodos abstratos (sem implementação) que devem ser implementados pelas subclasses

```typescript
abstract class Forma {
  constructor(protected cor: string) {}
  
  // Método comum com implementação
  descricao(): string {
    return `Uma forma ${this.cor}`;
  }
  
  // Método abstrato que deve ser implementado pelas subclasses
  abstract calcularArea(): number;
  
  // Método abstrato com parâmetro
  abstract redimensionar(fator: number): void;
}

class Retangulo extends Forma {
  constructor(
    protected cor: string,
    private largura: number,
    private altura: number
  ) {
    super(cor);
  }
  
  calcularArea(): number {
    return this.largura * this.altura;
  }
  
  redimensionar(fator: number): void {
    this.largura *= fator;
    this.altura *= fator;
  }
  
  // Método adicional específico desta classe
  calcularPerimetro(): number {
    return 2 * (this.largura + this.altura);
  }
}

class Circulo extends Forma {
  constructor(
    protected cor: string,
    private raio: number
  ) {
    super(cor);
  }
  
  calcularArea(): number {
    return Math.PI * this.raio ** 2;
  }
  
  redimensionar(fator: number): void {
    this.raio *= fator;
  }
}

// const minhaForma = new Forma("verde"); // Erro: não pode instanciar classe abstrata
const meuRetangulo = new Retangulo("azul", 10, 5);
const meuCirculo = new Circulo("vermelho", 7);

console.log(meuRetangulo.descricao()); // Saída: Uma forma azul
console.log(meuRetangulo.calcularArea()); // Saída: 50
meuRetangulo.redimensionar(2);
console.log(meuRetangulo.calcularArea()); // Saída: 200

console.log(meuCirculo.descricao()); // Saída: Uma forma vermelho
console.log(meuCirculo.calcularArea().toFixed(2)); // Saída aproximada: 153.94
```

## Padrões de Design para Classes
- **Padrão Singleton**: garantir que uma classe tenha apenas uma instância
- **Factory Methods**: métodos estáticos que criam e retornam instâncias da classe
- **Parameter Properties**: simplificação na declaração e inicialização de propriedades no construtor

```typescript
// Padrão Singleton
class Database {
  private static instance: Database;
  private connectionString: string;
  
  private constructor(connectionString: string) {
    this.connectionString = connectionString;
    console.log("Conexão com o banco de dados iniciada");
  }
  
  static getInstance(connectionString: string): Database {
    if (!Database.instance) {
      Database.instance = new Database(connectionString);
    }
    return Database.instance;
  }
  
  query(sql: string): void {
    console.log(`Executando query no banco ${this.connectionString}: ${sql}`);
  }
}

const db1 = Database.getInstance("mysql://localhost:3306/app");
const db2 = Database.getInstance("mysql://localhost:3306/app");

console.log(db1 === db2); // Saída: true (mesma instância)

// Factory Method
class Botao {
  constructor(public texto: string, public estilo: string) {}
  
  static criarBotaoPrimario(texto: string): Botao {
    return new Botao(texto, "primario");
  }
  
  static criarBotaoSecundario(texto: string): Botao {
    return new Botao(texto, "secundario");
  }
  
  static criarBotaoDanger(texto: string): Botao {
    return new Botao(texto, "danger");
  }
  
  render(): string {
    return `<button class="${this.estilo}">${this.texto}</button>`;
  }
}

const btnSalvar = Botao.criarBotaoPrimario("Salvar");
const btnCancelar = Botao.criarBotaoSecundario("Cancelar");
const btnExcluir = Botao.criarBotaoDanger("Excluir");

console.log(btnSalvar.render()); // Saída: <button class="primario">Salvar</button>
```

## This em Classes
- `this` refere-se à instância atual da classe
- Pode precisar de tratamento especial em callbacks e métodos assíncronos
- Arrow functions preservam o contexto de `this`

```typescript
class Contador {
  private valor: number = 0;
  
  incrementar(): void {
    this.valor++;
  }
  
  // Problema com 'this' em callbacks
  iniciarContagem() {
    // 'this' será undefined dentro desta função callback
    setTimeout(function() {
      this.incrementar(); // Erro: this.incrementar is not a function
    }, 1000);
  }
  
  // Solução 1: arrow function preserva 'this'
  iniciarContagemArrow() {
    setTimeout(() => {
      this.incrementar(); // Funciona corretamente
      console.log(this.valor);
    }, 1000);
  }
  
  // Solução 2: bind() para vincular 'this'
  iniciarContagemBind() {
    setTimeout(function(this: Contador) {
      this.incrementar();
      console.log(this.valor);
    }.bind(this), 1000);
  }
  
  obterValor(): number {
    return this.valor;
  }
}

const contador = new Contador();
contador.incrementar();
contador.iniciarContagemArrow();
// Após 1 segundo, mostrará: 2
```

## Classes e Interfaces
- Classes podem implementar interfaces
- Sintaxe: `class NomeClasse implements Interface1, Interface2 { ... }`
- A classe deve implementar todos os membros definidos nas interfaces

```typescript
interface Printavel {
  imprimir(): string;
}

interface Salvavel {
  salvar(): void;
  recuperar(id: string): boolean;
}

class Documento implements Printavel, Salvavel {
  constructor(
    private titulo: string,
    private conteudo: string,
    private id?: string
  ) {}
  
  imprimir(): string {
    return `DOCUMENTO: ${this.titulo}\n${this.conteudo}`;
  }
  
  salvar(): void {
    this.id = `doc_${Date.now()}`;
    console.log(`Documento salvo com ID: ${this.id}`);
  }
  
  recuperar(id: string): boolean {
    console.log(`Tentando recuperar documento ${id}`);
    return id === this.id;
  }
}

class Foto implements Printavel {
  constructor(private url: string, private descricao: string) {}
  
  imprimir(): string {
    return `FOTO: ${this.descricao}\nURL: ${this.url}`;
  }
}

// Função que trabalha com qualquer objeto Printavel
function imprimirItem(item: Printavel): void {
  console.log(item.imprimir());
}

const documento = new Documento("Relatório", "Conteúdo do relatório...");
const foto = new Foto("https://exemplo.com/foto.jpg", "Paisagem");

imprimirItem(documento); // Funciona porque Documento implementa Printavel
imprimirItem(foto); // Funciona porque Foto implementa Printavel

documento.salvar();
console.log(documento.recuperar("doc_12345")); // Provavelmente false
```

## Generic Classes
- Classes que trabalham com tipos genéricos
- Sintaxe: `class NomeClasse<T> { ... }`
- Permitem criar classes reutilizáveis e type-safe para diferentes tipos

```typescript
class Caixa<T> {
  private conteudo: T;
  
  constructor(conteudo: T) {
    this.conteudo = conteudo;
  }
  
  obterConteudo(): T {
    return this.conteudo;
  }
  
  definirConteudo(novoConteudo: T): void {
    this.conteudo = novoConteudo;
  }
}

// Caixa de strings
const caixaTexto = new Caixa<string>("Olá, mundo!");
const texto = caixaTexto.obterConteudo(); // tipo: string
caixaTexto.definirConteudo("Novo texto");

// Caixa de números
const caixaNumero = new Caixa<number>(42);
const numero = caixaNumero.obterConteudo(); // tipo: number
caixaNumero.definirConteudo(100);

// Caixa de objeto personalizado
interface Produto {
  nome: string;
  preco: number;
}

const caixaProduto = new Caixa<Produto>({ nome: "Laptop", preco: 1299.99 });
const produto = caixaProduto.obterConteudo(); // tipo: Produto
console.log(produto.nome); // Saída: Laptop

// Classe genérica com múltiplos parâmetros de tipo
class Par<K, V> {
  constructor(public chave: K, public valor: V) {}
}

const parStringNumero = new Par<string, number>("idade", 30);
const parNumericoBooleano = new Par<number, boolean>(1, true);
```

## Considerações sobre Classes em TypeScript vs. JavaScript
- TypeScript adiciona verificação de tipos estáticos
- Modificadores de acesso são apenas verificações em tempo de compilação
- O código compilado para JavaScript não mantém as verificações de tipos

```typescript
// TypeScript com verificação de tipos
class ExemploTS {
  private valorPrivado: string = "secreto";
  public valorPublico: number = 42;
  
  constructor() {
    // TypeScript impede acesso inadequado durante o desenvolvimento
    console.log(this.valorPrivado); // OK
  }
}

const exemplo = new ExemploTS();
// console.log(exemplo.valorPrivado); // Erro em TypeScript: propriedade é privada
console.log(exemplo.valorPublico); // OK: 42

// Quando compilado para JavaScript se torna:
/*
class ExemploJS {
    constructor() {
        this.valorPrivado = "secreto";
        this.valorPublico = 42;
        console.log(this.valorPrivado);
    }
}
// Em JavaScript, todas as propriedades são acessíveis:
const exemplo = new ExemploJS();
console.log(exemplo.valorPrivado); // Funciona em JavaScript: "secreto"
console.log(exemplo.valorPublico); // 42
*/
```