function greeter(fn) {
    fn("Hello World");
}
// greeter((b) => console.log(b));
function fB(nome, quantidade) {
    console.log(`${quantidade} ${nome}(s) criado(s)`);
}
// fB('notebook');
// ----------
function primeiroElemento(array) {
    return array[0];
}
const usuario = {
    nome: "Alice",
    saudar() {
        return `Olá, meu nome é ${this.nome}`;
    }
};
console.log(usuario.saudar());
;
function doSomething(fn) {
    console.log(fn.description + " returned " + fn(6));
}
function myFunc(a) {
    return a > 3;
}
myFunc.description = "default description";
// doSomething(myFunc);
// ---
function criarUsuario(nome, idade) { }
const p = ["Maria", 50];
// console.log(p, typeof p);
let [x, y, z] = [...p, 5];
function processar(valor) {
    if (typeof valor === "string") {
        return valor.toUpperCase();
    }
    return Number(valor);
}
console.log(processar(false));
export {};
