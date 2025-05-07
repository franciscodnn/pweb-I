export {};

interface Formatavel {
  formato(): string;
}

class Documento implements Formatavel {
  constructor(private conteudo: string) {}

  formato(): string {
    return this.conteudo.toUpperCase();
  }
  
  formato2(): string {
    return this.conteudo.toUpperCase();
  }
}

console.log( 'conteudo' in new Documento('teste') );

// ----

interface Usuario {
  nome: string;
  email: string;
}

const usuarioImutavel: Readonly<Usuario> = {
  nome: "Carlos",
  email: "carlos@example.com"
};

// usuarioImutavel.nome = 'Maria'; // Erro

console.log(usuarioImutavel);

// ----
interface Dicionario {
  [chave: string]: string;
}

const cores: Dicionario = {
  vermelho: "#FF0000",
  verde: "#00FF00",
  azul: "#0000FF",
  cinza: "#DDD"
};

// -----
interface Opcoes {
  largura: number;
  altura: number;
}

// Erro: objeto literal não pode ter propriedades extras
// const config: Opcoes = {
//   largura: 100,
//   altura: 200,
//   cor: "vermelho"  // Erro: propriedade não existe em Opcoes
// };

// Soluções:
const objeto = { largura: 100, altura: 200, cor: "vermelho" };
const opcoes: Opcoes = objeto;  // OK com variável intermediária

// ou usar asserção de tipo
const opcoes2: Opcoes = { largura: 100, altura: 200, cor: "vermelho" } as Opcoes;

console.log( typeof objeto );