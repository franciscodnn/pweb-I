export {};

type fA = (arg0: string) => void;
function greeter(fn: fA) {
  fn("Hello World");
}

// greeter((b) => console.log(b));

function fB(nome: string, quantidade?: number): void {
  console.log(`${quantidade} ${nome}(s) criado(s)`);
}

// fB('notebook');
// ----------
function primeiroElemento<T>(array: T[]): T | undefined {
  return array[0];
}

// console.log( primeiroElemento([1, 2, 3]) );  // tipo number
// console.log( primeiroElemento(["Ana", "Bruno"]) );  // tipo string

// ---
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

// -----
interface DescribableFunction {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
 
function myFunc(a: number) {
  return a > 3;
}
myFunc.description = "default description";
 
// doSomething(myFunc);

// ---
function criarUsuario(nome: string, idade: number) { /* ... */ }

type ParamsCriarUsuario = Parameters<typeof criarUsuario>;
const p:ParamsCriarUsuario = ["Maria", 50]

// console.log(p, typeof p);

let [x, y, z] = [...p, 5];
// console.log(typeof x, y, z);

// ----
type Retorno<T> = T extends string ? string : number;

function processar<T>(valor: T): Retorno<T> {
  if (typeof valor === "string") {
    return valor.toUpperCase() as Retorno<T>;
  }
  return Number(valor) as Retorno<T>;
}

console.log( processar(false) );