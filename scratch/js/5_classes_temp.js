"use strict";
// export {};
class Produto {
    constructor(codigo, preco) {
        // Campo com valor inicial
        this.nome = "Produto sem nome";
        this.codigo = codigo;
        this.preco = preco;
    }
}
const produto = new Produto("P001", 29.99);
console.log(produto.nome); // Saída: Produto sem nome
// produto.codigo = "P002"; // Erro: não pode atribuir a um campo readonly
// produto.codigo = "P002";
class Contador {
    constructor() {
        this.valor = 0;
    }
    incrementar() {
        this.valor++;
    }
    // Problema com 'this' em callbacks
    iniciarContagem() {
        // 'this' será undefined dentro desta função callback
        setTimeout(function () {
            this.incrementar(); // Erro: this.incrementar is not a function
        }, 1000);
    }
    // Solução 1: arrow function preserva 'this'
    iniciarContagemArrow() {
        setTimeout(() => {
            this.incrementar(); // Funciona corretamente
            console.log(this.valor);
        }, 1000);
    }
    // Solução 2: bind() para vincular 'this'
    iniciarContagemBind() {
        setTimeout(function () {
            this.incrementar();
            console.log(this.valor);
        }.bind(this), 1000);
    }
    obterValor() {
        return this.valor;
    }
}
const contador = new Contador();
contador.incrementar();
contador.iniciarContagemArrow();
// Após 1 segundo, mostrará: 2
