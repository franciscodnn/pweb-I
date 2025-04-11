// Erro: objeto literal não pode ter propriedades extras
const config = {
    largura: 100,
    altura: 200,
    // cor: "vermelho"  // Erro: propriedade não existe em Opcoes
};
// Soluções:
const objeto = { largura: 100, altura: 200, cor: "vermelho" };
const opcoes = objeto; // OK com variável intermediária
// ou usar asserção de tipo
const opcoes2 = { largura: 100, altura: 200, cor: "vermelho" };
console.log(opcoes2);
const opcaoCompleta = {
    titulo: "Obrigatório",
    descricao: "teste"
};
console.log(opcaoCompleta);
let produto = {
    id: 1,
    nome: "notebook"
};
console.log(produto);
export {};
