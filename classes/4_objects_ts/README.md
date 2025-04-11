[main](../../README.md)

# Aula 4 - Objetos

## Tipos de Objeto

- **Tipos Anônimos**: Definem estruturas de objeto inline
  ```typescript
  function saudar(pessoa: { nome: string; idade: number }) {
    return `Olá ${pessoa.nome}, você tem ${pessoa.idade} anos!`;
  }
  ```

- **Propriedades Opcionais**: Marcadas com `?`
  ```typescript
  interface Pessoa {
    nome: string;
    idade: number;
    endereco?: string;  // Propriedade opcional
  }
  ```

## Interfaces

- **Definição Básica**: Contratos que definem a estrutura de objetos
  ```typescript
  interface Usuario {
    id: number;
    nome: string;
    email: string;
    ativo: boolean;
  }
  
  const usuario: Usuario = {
    id: 1,
    nome: "Alice",
    email: "alice@example.com",
    ativo: true
  };
  ```

- **Extensão de Interfaces**: Herdam propriedades de outras interfaces
  ```typescript
  interface Animal {
    nome: string;
  }
  
  interface Cachorro extends Animal {
    raca: string;
    latir(): void;
  }
  ```

- **Implementando Interfaces**: Classes podem implementar interfaces
  ```typescript
  interface Formatavel {
    formato(): string;
  }
  
  class Documento implements Formatavel {
    constructor(private conteudo: string) {}
    
    formato(): string {
      return this.conteudo.toUpperCase();
    }
  }
  ```

## Type Aliases

- **Definição Básica**: Cria um nome para um tipo
  ```typescript
  type Ponto = {
    x: number;
    y: number;
  };
  
  const ponto: Ponto = { x: 10, y: 20 };
  ```

- **Interseção de Tipos**: Combina múltiplos tipos
  ```typescript
  type Pessoa = { nome: string; idade: number };
  type Empregado = { empresa: string; cargo: string };
  
  type Funcionario = Pessoa & Empregado;
  
  const funcionario: Funcionario = {
    nome: "João",
    idade: 30,
    empresa: "TechCorp",
    cargo: "Desenvolvedor"
  };
  ```

- **União de Tipos**: Permite múltiplos tipos
  ```typescript
  type ID = string | number;
  
  function processarID(id: ID) {
    console.log(`Processando ID: ${id}`);
  }
  ```

## Interfaces vs Type Aliases

- **Interfaces**:
  - Podem ser estendidas com `extends`
  - Podem ser implementadas por classes
  - Podem ser mescladas (declaration merging)
  - Boas para definir APIs públicas

- **Type Aliases**:
  - Podem usar uniões e interseções diretamente
  - Podem representar tipos primitivos, uniões, tuplas
  - Não podem ser mesclados após definição
  - Bons para tipos complexos ou compostos

## Modificadores de Propriedade

- **readonly**: Impede modificação após inicialização
  ```typescript
  interface Config {
    readonly apiKey: string;
    timeout: number;
  }
  
  const config: Config = { apiKey: "abc123", timeout: 3000 };
  // config.apiKey = "xyz"; // Erro: não pode modificar propriedade readonly
  ```

- **Propriedades de Índice**: Permitem propriedades dinâmicas
  ```typescript
  interface Dicionario {
    [chave: string]: string;
  }
  
  const cores: Dicionario = {
    vermelho: "#FF0000",
    verde: "#00FF00",
    azul: "#0000FF"
  };
  ```

## Tipos Utilitários para Objetos

- **Partial<T>**: Torna todas as propriedades opcionais
  ```typescript
  interface Produto {
    id: number;
    nome: string;
    preco: number;
  }
  
  function atualizarProduto(id: number, mudancas: Partial<Produto>) {
    // Implementação
  }
  ```

- **Required<T>**: Torna todas as propriedades obrigatórias
  ```typescript
  interface ConfiguracaoOpcional {
    tema?: string;
    notificacoes?: boolean;
  }
  
  const configCompleta: Required<ConfiguracaoOpcional> = {
    tema: "escuro",
    notificacoes: true
  };
  ```

- **Readonly<T>**: Torna todas as propriedades readonly
  ```typescript
  interface Usuario {
    nome: string;
    email: string;
  }
  
  const usuarioImutavel: Readonly<Usuario> = {
    nome: "Carlos",
    email: "carlos@example.com"
  };
  ```

- **Pick<T, K>**: Seleciona um subconjunto de propriedades
  ```typescript
  interface Pessoa {
    nome: string;
    idade: number;
    endereco: string;
    telefone: string;
  }
  
  type Contato = Pick<Pessoa, "nome" | "telefone">;
  // { nome: string; telefone: string; }
  ```

- **Omit<T, K>**: Omite propriedades específicas
  ```typescript
  interface Produto {
    id: number;
    nome: string;
    preco: number;
    estoque: number;
  }
  
  type ProdutoBasico = Omit<Produto, "estoque" | "id">;
  // { nome: string; preco: number; }
  ```

## Excesso de Propriedades

- TypeScript verifica propriedades extras em objetos literais
  ```typescript
  interface Opcoes {
    largura: number;
    altura: number;
  }
  
  // Erro: objeto literal não pode ter propriedades extras
  const config: Opcoes = {
    largura: 100,
    altura: 200,
    cor: "vermelho"  // Erro: propriedade não existe em Opcoes
  };
  
  // Soluções:
  const objeto = { largura: 100, altura: 200, cor: "vermelho" };
  const opcoes: Opcoes = objeto;  // OK com variável intermediária
  
  // ou usar asserção de tipo
  const opcoes2: Opcoes = { largura: 100, altura: 200, cor: "vermelho" } as Opcoes;
  ```

## Tipos de Tupla

- Arrays fortemente tipados com comprimento fixo
  ```typescript
  type Coordenada = [number, number];
  
  const ponto: Coordenada = [10, 20];
  ```

- Tuplas com elementos opcionais
  ```typescript
  type Resultado = [number, string, boolean?];
  
  const sucesso: Resultado = [200, "OK"];
  const erro: Resultado = [404, "Não encontrado", false];
  ```

## Destructuring com Anotações de Tipo

- Aplicando tipos em destructuring
  ```typescript
  function processarPessoa({ nome, idade }: { nome: string; idade: number }) {
    console.log(`${nome} tem ${idade} anos`);
  }
  
  processarPessoa({ nome: "Ana", idade: 28 });
  ```
