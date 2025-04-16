const soma = function (o) {
    return this.a + this.b;
};
soma.a = 10;
soma.b = 30;
console.log(soma.call(soma, '+'));
// -----
function somaDois(operador) {
    if (operador === '+')
        return this.a + this.b;
    if (operador === '-')
        return this.a - this.b;
    return 0;
}
const contexto = { a: 10, b: 4 };
console.log(soma.call(contexto, '+')); // 14
function converter(valor) {
    if (typeof valor === "string") {
        return Number(valor);
    }
    else {
        return String(valor);
    }
}
console.log(converter(true));
const usuario = {
    nome: "Alice",
    saudar() {
        return `Olá, meu nome é ${this.nome}`;
    }
};
console.log(usuario.saudar());
// ----
function criarUsuario(nome, idade) { }
// [nome: string, idade: number]
const user1 = ["Maria", 50];
function processar(valor) {
    if (typeof valor === "string") {
        return valor.toUpperCase();
    }
    return 50;
}
console.log(processar(50));
export {};
