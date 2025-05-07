"use strict";
// TypeScript com verificação de tipos
class ExemploTS {
    constructor() {
        this.valorPrivado = "secreto";
        this.valorPublico = 42;
        // TypeScript impede acesso inadequado durante o desenvolvimento
        console.log(this.valorPrivado); // OK
    }
}
const exemplo = new ExemploTS();
// console.log(exemplo.valorPrivado); // Erro em TypeScript: propriedade é privada
console.log(exemplo.valorPublico); // OK: 42
console.log(exemplo.valorPrivado);
