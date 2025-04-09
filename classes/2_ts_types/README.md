[main](../../README.md)

# Aula 2 - Tipos em TypeScript

## Tipos Primitivos
- **string**: Representa texto - use aspas simples ('), duplas (") ou crases (`) para definir
```typescript
let nome: string = 'João';
let frase: string = "TypeScript é incrível";
let template: string = `Olá, ${nome}!`;
```
- **number**: Representa números inteiros e de ponto flutuante (3, 3.14, 0xFF)
```typescript
let inteiro: number = 42;
let decimal: number = 3.14;
let hex: number = 0xFF;  // 255 em hexadecimal
let binario: number = 0b1010;  // 10 em binário
```
- **boolean**: Representa valores verdadeiro/falso (true/false)
```typescript
let ativo: boolean = true;
let desativado: boolean = false;
```
- **null** e **undefined**: Tipos que têm os valores null e undefined respectivamente
```typescript
let nulo: null = null;
let indefinido: undefined = undefined;
```
- **symbol**: Valores únicos e imutáveis, úteis como chaves para objetos
```typescript
let sym1: symbol = Symbol("chave");
let sym2: symbol = Symbol("chave");  // sym1 !== sym2
```
- **bigint**: Representa números inteiros muito grandes
```typescript
let grandeNumero: bigint = 9007199254740991n;
```

## Arrays
- Use `type[]` ou `Array<type>` para declarar arrays
- Exemplo: `number[]` ou `Array<number>` para um array de números
```typescript
let numeros: number[] = [1, 2, 3, 4, 5];
let nomes: Array<string> = ["Ana", "Pedro", "Maria"];
```
- Arrays podem conter elementos de múltiplos tipos com uniões
```typescript
let misturado: (string | number)[] = [1, "dois", 3, "quatro"];
```

## Tipos Especiais
- **any**: Desativa a verificação de tipos, use com moderação
```typescript
let qualquerCoisa: any = 4;
qualquerCoisa = "agora sou string";
qualquerCoisa = false;  // funciona sem erro
```
- **unknown**: Versão segura do any - requer verificação de tipo antes do uso
```typescript
let valor: unknown = 30;
// valor.toFixed(2);  // Erro! Precisa verificar o tipo primeiro

if (typeof valor === "number") {
  console.log(valor.toFixed(2));  // OK após verificação
}
```
- **void**: Usado para funções que não retornam valor
```typescript
function logMensagem(msg: string): void {
  console.log(msg);
  // sem return, ou return sem valor
}
```
- **never**: Representa valores que nunca ocorrem (funções que lançam exceções ou loops infinitos)
```typescript
function erro(msg: string): never {
  throw new Error(msg);  // nunca retorna
}

function loopInfinito(): never {
  while (true) {
    // código que nunca termina
  }
}
```

## Tipos de Objeto
- **object**: Representa qualquer valor não-primitivo
- Objetos podem ser tipados com interfaces ou tipos literais
- Exemplo: `{ name: string, age: number }`
```typescript
let pessoa: object = { nome: "Carlos", idade: 30 };

// Definição mais específica:
let usuario: { nome: string; idade: number } = {
  nome: "Maria",
  idade: 25
};
```

## Asserções de Tipo
- Duas sintaxes: `valor as Tipo` ou `<Tipo>valor`
- Informa ao compilador sobre o tipo quando você tem mais informações do que ele
- Não executa conversão de dados, apenas muda como o TypeScript interpreta o tipo
```typescript
let algumValor: unknown = "isso é uma string";

let comprimento: number = (algumValor as string).length;
// ou
let comprimentoAlt: number = (<string>algumValor).length;
```

## Funções
- Parâmetros e retornos podem ser tipados
- Exemplo: `function add(x: number, y: number): number { return x + y; }`
```typescript
function soma(x: number, y: number): number {
  return x + y;
}

// Funções de seta
const multiplicar = (x: number, y: number): number => x * y;
```
- Parâmetros opcionais com `?`: `function greet(name?: string)`
```typescript
function saudacao(nome?: string): string {
  return `Olá, ${nome || 'visitante'}!`;
}

function bemVindo(nome: string = 'visitante'): string {
  return `Bem-vindo, ${nome}!`;
}
```

## Tipos Literais
- Valores específicos como tipos: `"hello"`, `42`, `true`
- Úteis para limitar valores a um conjunto específico
- Exemplo: `let direction: "north" | "south" | "east" | "west";`
```typescript
let status: "ativo" | "inativo" | "pendente";
status = "ativo";  // OK
// status = "cancelado";  // Erro!

let codigo: 200 | 404 | 500 = 200;  // Apenas estes valores são permitidos
```

## Uniões e Interseções
- **União** (`|`): O valor pode ser de um dos tipos especificados
- **Interseção** (`&`): O valor tem todos os tipos especificados combinados
- Exemplo de união: `string | number`
```typescript
function exibirId(id: string | number) {
  console.log(`ID: ${id}`);
}

exibirId(123);     // OK
exibirId("ABC");   // OK
// exibirId(true);  // Erro!
```
- Exemplo de interseção: `Person & Employee`
```typescript
type Pessoa = { nome: string; idade: number };
type Funcionario = { cargo: string; id: number };

type FuncionarioCompleto = Pessoa & Funcionario;

const joao: FuncionarioCompleto = {
  nome: "João",
  idade: 30,
  cargo: "Desenvolvedor",
  id: 12345
};
```

## Type Aliases e Interfaces
- **Type Alias**: Cria um nome para um tipo
```typescript
type Ponto = { x: number; y: number };
type ID = string | number;

const ponto: Ponto = { x: 10, y: 20 };
const id: ID = "abc123";
```

- **Interface**: Define contratos para objetos
- Ambos definem "formas" de objetos, com diferenças sutis
```typescript
interface Pessoa {
  nome: string;
  idade: number;
  saudacao(): string;
}

class Aluno implements Pessoa {
  nome: string;
  idade: number;
  
  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }
  
  saudacao() {
    return `Olá, meu nome é ${this.nome}`;
  }
}
```

## Tipos Utilitários
- **Readonly**: Evita modificações após a criação
```typescript
interface Usuario {
  readonly id: number;
  nome: string;
}

const usuario: Readonly<Usuario> = {
  id: 1,
  nome: "Alice"
};

// usuario.id = 2;  // Erro! Não pode modificar
usuario.nome = "Alicia";  // OK
```
- **Partial**: Torna todas as propriedades opcionais
```typescript
interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
}

function atualizarProduto(id: number, mudancas: Partial<Produto>) {
  // atualiza apenas os campos fornecidos
}

atualizarProduto(1, { preco: 29.99 });  // apenas o preço é atualizado
```
- **Required**: Torna todas as propriedades obrigatórias
```typescript
interface PropriedadesOpcao {
  titulo?: string;
  descricao?: string;
}

const opcaoCompleta: Required<PropriedadesOpcao> = {
  titulo: "Obrigatório",
  descricao: "Também obrigatório"
};
```
- **Pick/Omit**: Seleciona ou omite propriedades específicas
```typescript
interface Artigo {
  id: number;
  titulo: string;
  conteudo: string;
  autor: string;
  dataCriacao: Date;
}

type ArtigoResumido = Pick<Artigo, "id" | "titulo" | "autor">;

type ArtigoSemId = Omit<Artigo, "id">;
```

## Verificação de Tipos
- **typeof**: Verifica tipos primitivos em runtime
```typescript
function processarValor(valor: unknown) {
  if (typeof valor === "string") {
    return valor.toUpperCase();  // OK, TypeScript sabe que é string
  } else if (typeof valor === "number") {
    return valor.toFixed(2);     // OK, TypeScript sabe que é number
  }
  return String(valor);
}
```
- **instanceof**: Verifica se um objeto é instância de uma classe
```typescript
class Animal {
  nome: string;
  constructor(nome: string) {
    this.nome = nome;
  }
}

class Cachorro extends Animal {
  latir() { return "Au au!"; }
}

function fazerBarulho(animal: Animal) {
  if (animal instanceof Cachorro) {
    return animal.latir();  // OK, TypeScript sabe que é Cachorro
  }
  return "Som desconhecido";
}
```
- **in**: Verifica se uma propriedade existe em um objeto
- TypeScript usa guard clauses para refinar tipos em blocos condicionais
```typescript
interface Passaro {
  voar(): void;
  tipo: string;
}

interface Peixe {
  nadar(): void;
  tipo: string;
}

function mover(animal: Passaro | Peixe) {
  if ("voar" in animal) {
    animal.voar();  // OK, TypeScript sabe que é Passaro
  } else {
    animal.nadar();  // OK, TypeScript sabe que é Peixe
  }
}
```
