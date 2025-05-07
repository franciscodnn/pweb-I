"use strict";
// export {};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Animal_name_accessor_storage, _Aula_docente_accessor_storage;
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
            // this.incrementar(); // Erro: this.incrementar is not a function
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
// contador.iniciarContagem();
contador.iniciarContagemArrow();
// Após 1 segundo, mostrará: 2
// ---
// Usando modificadores de acesso nos parâmetros do construtor
class Usuario {
    constructor(username, password, id) {
        this.username = username;
        this.password = password;
        this.id = id;
        // O código acima automaticamente cria e inicializa as propriedades
    }
    verificarSenha(senha) {
        return this.password === senha;
    }
}
const usuario = new Usuario("joao123", "senha123", 1);
console.log(usuario.username); // Saída: joao123
// console.log(usuario.password); // Erro: propriedade privada
console.log(usuario.id); // Saída: 1
class Animal {
    get name() { return __classPrivateFieldGet(this, _Animal_name_accessor_storage, "f"); }
    set name(value) { __classPrivateFieldSet(this, _Animal_name_accessor_storage, value, "f"); }
    constructor(name) {
        _Animal_name_accessor_storage.set(this, void 0);
        this.name = name;
    }
}
_Animal_name_accessor_storage = new WeakMap();
class Cachorro extends Animal {
    constructor(nome) {
        super(nome);
    }
}
const dog = new Cachorro('totó');
console.log(dog.name);
function desenhar(forma) {
    switch (forma) {
        case "círculo":
            console.log("Desenhando um círculo");
            break;
        case "quadrado":
            console.log("Desenhando um quadrado");
            break;
        case "triângulo":
            console.log("Desenhando um triângulo");
            break;
        default:
            // Esse bloco nunca deveria ser alcançado
            const _exhaustiveCheck = forma;
            throw new Error(`Forma desconhecida: ${forma}`);
    }
}
let y = 'círculo';
// console.log(desenhar('quadrado'));
class Aula {
    get docente() { return __classPrivateFieldGet(this, _Aula_docente_accessor_storage, "f"); }
    set docente(value) { __classPrivateFieldSet(this, _Aula_docente_accessor_storage, value, "f"); }
    constructor(docente) {
        _Aula_docente_accessor_storage.set(this, void 0);
        this.docente = docente;
    }
}
_Aula_docente_accessor_storage = new WeakMap();
class AulaPresencial extends Aula {
    constructor(_disciplina, docente) {
        super(docente);
        this._disciplina = _disciplina;
    }
    set docente2(nome) {
        this.docente = nome;
    }
    get docente2() {
        return `Olá, ${this.docente}`;
    }
    get disciplina() {
        return `Disciplina: ${this._disciplina}`;
    }
}
let teste = new AulaPresencial('LS', 'Francisco');
console.log(teste.docente);
