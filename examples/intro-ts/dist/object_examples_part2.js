"use strict";
class Conta {
    constructor() {
        this._saldo = 0;
    }
    // Getter
    get saldo() {
        console.log("Saldo consultado");
        return this._saldo;
    }
    // Setter
    set saldo(valor) {
        if (valor < 0) {
            console.error("Não é possível definir um saldo negativo");
            return;
        }
        console.log(`Saldo alterado de ${this._saldo} para ${valor}`);
        this._saldo = valor;
    }
    // Propriedade somente leitura (apenas getter)
    get saldoEmDolar() {
        // Taxa de câmbio fictícia
        return this._saldo / 5;
    }
}
const conta = new Conta();
// conta.saldo = -100;
// console.log(conta.saldo);

