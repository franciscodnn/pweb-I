function converter(valor) {
    if (typeof valor === "string") {
        return Number(valor);
    }
    else {
        return String(valor);
    }
}
// console.log( converter('50') );
// Tipos Genéricos em TS
function primeiroElemento(array) {
    return array[0];
}
// console.log(primeiroElemento([1, 2, 3]));  // tipo number
// console.log(primeiroElemento(["Ana", "Bruno"]));  // tipo string
// console.log(primeiroElemento([true, true, false]));
// function primeiroElemento(values: (number[] | string[])): number | string | undefined {
//     return values[0];
// }
function soma(a, b) {
    return a + b;
}
const valor = [10, 50];
// Onde inserir TipoConstrutor na função de crição abaixo?
// function criarInstancia
function criarInstancia(Construtor, nome) {
    return new Construtor(nome);
}
// Exemplo de classe que bate com o TipoContrutor
class Pessoa {
    constructor(nome, idade) {
        this.nome = nome;
    }
    cumprimentar() {
        console.log(`Olá, meu nome é ${this.nome}`);
    }
}
// Criando uma instância da classe Pessoa com a função genérica
const pessoa = criarInstancia(Pessoa, "Ana");
const formatarMaiusculo = (s) => s.toUpperCase();
formatarMaiusculo.formato = "MAIÚSCULO";
const fSoma = function (x, y) {
    return x + y;
};
const fSubtracao = (x, y) => x - y;
function processar(valor) {
    if (typeof valor === "string") {
        return valor.toUpperCase();
    }
    return valor;
}
console.log(processar('teste'));
console.log(processar(50));
console.log(processar(true));
export {};
