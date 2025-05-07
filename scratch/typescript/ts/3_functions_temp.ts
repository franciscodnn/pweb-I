export {};
/*
function converter<T>(valor: T): T {
  if(typeof valor === 'string')
    return 'string' as T;

  return typeof valor as T;
}
*/
// console.log( typeof converter(true) );

interface FuncaoCalculo {
  (o: string) : number;
  a: number;
  b: number;
}

const soma: FuncaoCalculo = function(this: FuncaoCalculo, o: string) {
  return this.a + this.b;
}

soma.a = 10;
soma.b = 30;

console.log( soma.call(soma, '+') );

// -----
function somaDois(this: {a: number, b:number}, operador: string) {
  if (operador === '+') return this.a + this.b;
  if (operador === '-') return this.a - this.b;
  return 0;
}

const contexto = { a: 10, b: 4 };

console.log(soma.call(contexto, '+')); // 14

// ----
function converter(valor: string): number;
function converter(valor: number): string;
function converter(valor: boolean): string;

function converter(valor: string | number | boolean): number | string {
  if (typeof valor === "string") {
    return Number(valor);
  } else {
    return String(valor);
  }
}

console.log( (converter(true) as string) );

// ----
interface Usuario {
  nome: string;
  saudar(this: Usuario): string;
}

const usuario: Usuario = {
  nome: "Alice",
  saudar() {
    return `Olá, meu nome é ${this.nome}`;
  }
};

console.log( usuario.saudar() );

// ----
function criarUsuario(nome: string, idade: number) { /* ... */ }

type ParamsCriarUsuario = Parameters<typeof criarUsuario>;
// [nome: string, idade: number]

const user1: ParamsCriarUsuario = ["Maria", 50];

// ----
type Retorno<T> = T extends string ? string : number;

function processar<T>(valor: T): Retorno<T> {
  if (typeof valor === "string") {
    return valor.toUpperCase() as Retorno<T>;
  }
  return 50 as Retorno<T>;
}

console.log( processar(50) );