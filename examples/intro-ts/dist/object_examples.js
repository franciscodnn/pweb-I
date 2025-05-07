"use strict";
function saudar(pessoa) {
    return `Olá ${pessoa.nome}, você tem ${pessoa.idade} anos!`;
}
const pessoa = {
    nome: "Maria",
    idade: 50
};
pessoa.endereco = "Av. Primeiro de Maio, 720";
const cachorro = {
    nome: "Totó",
    raca: "vira-lata",
    latir: () => console.log("Latir")
};
cachorro.latir();
