export {};

interface Opcoes {
  largura: number;
  altura: number;
}

// Erro: objeto literal não pode ter propriedades extras
const config: Opcoes = {
  largura: 100,
  altura: 200,
  // cor: "vermelho"  // Erro: propriedade não existe em Opcoes
};

// Soluções:
const objeto = { largura: 100, altura: 200, cor: "vermelho" };
const opcoes: Opcoes = objeto;  // OK com variável intermediária

// ou usar asserção de tipo
const opcoes2: Opcoes = { largura: 100, altura: 200, cor: "vermelho" } as Opcoes;

console.log( opcoes2 );

// ----
interface PropriedadesOpcao {
  titulo?: string;
  descricao?: string;
}

const opcaoCompleta: Required<PropriedadesOpcao> = {
  titulo: "Obrigatório",
  descricao: "teste"
  
};

console.log(opcaoCompleta);

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
}

let produto: Partial<Produto> = {
  id: 1,
  nome: "notebook"
}

console.log( produto );