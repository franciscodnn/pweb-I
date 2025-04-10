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