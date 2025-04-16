[main](../../README.md)

# Aula 3 - Funções

## Tipos de Função
- **Declaração de tipos para funções**: Define os tipos dos parâmetros e retorno
  ```typescript
  function soma(a: number, b: number): number {
    return a + b;
  }
  ```

- **Tipos de função**: Descreve a assinatura completa de uma função
  ```typescript
  type OperacaoMatematica = (x: number, y: number) => number;
  
  const adicao: OperacaoMatematica = (a, b) => a + b;
  const subtracao: OperacaoMatematica = (a, b) => a - b;
  ```

## Parâmetros
- **Parâmetros opcionais**: Marcados com `?`
  ```typescript
  function saudacao(nome: string, titulo?: string): string {
    if (titulo) {
      return `Olá, ${titulo} ${nome}!`;
    }
    return `Olá, ${nome}!`;
  }
  ```

- **Parâmetros padrão**: Fornecem valores default
  ```typescript
  function criarItem(nome: string, quantidade = 1): void {
    console.log(`${quantidade} ${nome}(s) criado(s)`);
  }
  ```

- **Parâmetros rest**: Captura múltiplos argumentos em um array
  ```typescript
  function somarTodos(...numeros: number[]): number {
    return numeros.reduce((total, n) => total + n, 0);
  }
  ```

## Sobrecargas de Função
- Define múltiplas assinaturas para a mesma função
  ```typescript
  function converter(valor: string): number;
  function converter(valor: number): string;
  function converter(valor: string | number): number | string {
    if (typeof valor === "string") {
      return parseFloat(valor);
    } else {
      return String(valor);
    }
  }
  ```

## This em Funções
- **Parâmetro this**: Declara o tipo de `this` dentro da função
  ```typescript
  interface Usuario {
    nome: string;
    saudar(this: Usuario): string;
  }
  
  const usuario: Usuario = {
    nome: "Alice",
    saudar() {
      return `Olá, meu nome é ${this.nome}`;
    }
  };
  ```

## Funções Genéricas
- Permitem trabalhar com diversos tipos mantendo a segurança de tipos
  ```typescript
  function primeiroElemento<T>(array: T[]): T | undefined {
    return array[0];
  }
  
  console.log( primeiroElemento([1, 2, 3]) );  // tipo number
  console.log( primeiroElemento(["Ana", "Bruno"]) );  // tipo string
  ```

- **Restrições em genéricos**: Limitam os tipos que podem ser usados
  ```typescript
  interface ComTamanho {
    length: number;
  }
  
  function tamanho<T extends ComTamanho>(item: T): number {
    return item.length;
  }
  
  tamanho("teste");  // 5
  tamanho([1, 2, 3]);  // 3
  // tamanho(123);  // Erro: número não tem propriedade length
  ```

## Tipos Utilitários para Funções
- **Parameters<T>**: Extrai os tipos dos parâmetros de uma função
  ```typescript
  function criarUsuario(nome: string, idade: number) { /* ... */ }
  
  type ParamsCriarUsuario = Parameters<typeof criarUsuario>;
  // [nome: string, idade: number]
  ```

- **ReturnType<T>**: Extrai o tipo de retorno de uma função
  ```typescript
  function buscarUsuario() { 
    return { id: 1, nome: "João" };
  }
  
  type Usuario = ReturnType<typeof buscarUsuario>;
  // { id: number, nome: string }
  ```

## Funções como Construtores
- Funções que podem ser usadas com `new` para criar objetos
  ```typescript
  interface TipoContrutor {
    new (nome: string): { nome: string };
  }
  
  function criarInstancia<T>(Construtor: new (nome: string) => T, nome: string): T {
    return new Construtor(nome);
  }

  // Exemplo de classe que bate com o TipoContrutor
  class Pessoa {
    nome: string;

    constructor(nome: string) {
      this.nome = nome;
    }

    cumprimentar() {
      console.log(`Olá, meu nome é ${this.nome}`);
    }
  }

  // Criando uma instância da classe Pessoa com a função genérica
  const pessoa = criarInstancia(Pessoa, "Ana");

  console.log(pessoa.nome); // Ana
  (pessoa as Pessoa).cumprimentar(); // Olá, meu nome é Ana
  ```

## Assinaturas de Chamada
- Define como uma função pode ser invocada
  ```typescript
  interface FuncaoFormatadora {
    (valor: string): string;
    formato: string;
  }
  
  const formatarMaiusculo: FuncaoFormatadora = (s: string) => s.toUpperCase();
  formatarMaiusculo.formato = "MAIÚSCULO";
  ```

## Inferência de Tipos
- TypeScript pode inferir tipos de parâmetros baseado no contexto
  ```typescript
  const nomes = ["Alice", "Bob", "Charlie"];
  
  // TypeScript infere que 'nome' é string
  nomes.forEach(nome => {
    console.log(nome.toUpperCase());
  });
  ```

## Tipos Condicionais com Funções
- Determina o tipo de retorno baseado nos tipos dos parâmetros
  ```typescript
  type Retorno<T> = T extends string ? string : number;
  
  function processar<T>(valor: T): Retorno<T> {
    if (typeof valor === "string") {
      return valor.toUpperCase() as Retorno<T>;
    }
    return 42 as Retorno<T>;
  }
  ```

## Funções Assíncronas
- Funções que retornam Promises
  ```typescript
  async function buscarDados(id: number): Promise<object> {
    const resposta = await fetch(`https://api.exemplo.com/dados/${id}`);
    return resposta.json();
  }
  ```