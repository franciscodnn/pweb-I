"use strict";
function soma(op1, op2) {
    return op1 + op2;
}
function calculadora(op1, op2, operador = '+') {
    console.log(operador);
    return 0;
}
calculadora(1, 2);
calculadora(1, 2, '/');
// console.log( soma(2, 3) );
// --- tipos de variáveis
let uniao;
uniao = 'teste';
uniao = 5;
// uniao = true; // erro
let metodosHTTPSuportados;
metodosHTTPSuportados = "GET";
let uuid;
uuid = 10;
uuid = "abcd30xy";
let dd = {
    cod: 3354,
    CH: 67,
    email: "teste@ifpb.edu.br",
    nome: "Francisco"
};
;
let carro = {
    nome: "Celta",
    autonomiaKM: 500,
    cor: "Prata",
    andar() {
        return "Carro está andando";
    }
};
console.log(carro.andar());
let carroDadosParciais = {
    nome: "Gol",
    cor: "Branco"
};
// Function
function somaVarios(...numeros) {
    let resultado = 0;
    for (const n of numeros) {
        resultado += n;
    }
    return resultado;
}
somaVarios(3, 5);
console.log(somaVarios(3, 5, 8, 10));
