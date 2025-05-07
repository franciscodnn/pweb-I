class Documento {
    constructor(conteudo) {
        this.conteudo = conteudo;
    }
    formato() {
        return this.conteudo.toUpperCase();
    }
    formato2() {
        return this.conteudo.toUpperCase();
    }
}
console.log('conteudo' in new Documento('teste'));
const usuarioImutavel = {
    nome: "Carlos",
    email: "carlos@example.com"
};
// usuarioImutavel.nome = 'Maria'; // Erro
console.log(usuarioImutavel);
const cores = {
    vermelho: "#FF0000",
    verde: "#00FF00",
    azul: "#0000FF",
    cinza: "#DDD"
};
// Erro: objeto literal não pode ter propriedades extras
// const config: Opcoes = {
//   largura: 100,
//   altura: 200,
//   cor: "vermelho"  // Erro: propriedade não existe em Opcoes
// };
// Soluções:
const objeto = { largura: 100, altura: 200, cor: "vermelho" };
const opcoes = objeto; // OK com variável intermediária
// ou usar asserção de tipo
const opcoes2 = { largura: 100, altura: 200, cor: "vermelho" };
console.log(typeof objeto);
export {};
