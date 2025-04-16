export { };

function converter(valor: string): number;
function converter(valor: number): string;

function converter(valor: string | number | boolean): number | string {
    if (typeof valor === "string") {
        return Number(valor);
    } else {
        return String(valor);
    }
}

// console.log( converter('50') );

// Tipos Genéricos em TS
function primeiroElemento<T>(array: T[]): T | undefined {
    return array[0];
}

// console.log(primeiroElemento([1, 2, 3]));  // tipo number
// console.log(primeiroElemento(["Ana", "Bruno"]));  // tipo string
// console.log(primeiroElemento([true, true, false]));

// function primeiroElemento(values: (number[] | string[])): number | string | undefined {
//     return values[0];
// }

function soma(a: number, b: number): number {
    return a + b;
}

type ParametroAPartirDeSoma = Parameters<typeof soma>;

const valor: ParametroAPartirDeSoma = [10, 50];

// console.log(valor);

// console.log(soma(...valor));

// ------

interface TipoContrutor {
    new(nome: string): { nome: string };
}

// Onde inserir TipoConstrutor na função de crição abaixo?
// function criarInstancia
function criarInstancia<T>(Construtor: new (nome: string) => T, nome: string): T {
    return new Construtor(nome);
}



// Exemplo de classe que bate com o TipoContrutor
class Pessoa {
    nome: string;

    constructor(nome: string, idade?: number) {
        this.nome = nome;
    }

    cumprimentar() {
        console.log(`Olá, meu nome é ${this.nome}`);
    }
}

// Criando uma instância da classe Pessoa com a função genérica
const pessoa = criarInstancia(Pessoa, "Ana");

// console.log(pessoa.nome); // Ana
// (pessoa as Pessoa).cumprimentar(); // Olá, meu nome é Ana

// ----
interface FuncaoFormatadora {
    (valor: string): string;
    formato: string;
}

const formatarMaiusculo: FuncaoFormatadora = (s: string) => s.toUpperCase();
formatarMaiusculo.formato = "MAIÚSCULO";

// console.log( formatarMaiusculo('teste') );

interface FuncaoCalculadora {
    (x: number, y: number): number;
}

const fSoma: FuncaoCalculadora = function(x: number, y:number): number {
    return x + y;
}

const fSubtracao: FuncaoCalculadora = (x, y) => x - y;

// -----
type Retorno<T> = T extends string ? string : number;

function processar<T>(valor: T): Retorno<T> {
  if (typeof valor === "string") {
    return valor.toUpperCase() as Retorno<T>;
  }
  return valor as Retorno<T>;
}

console.log( processar('teste') );
console.log( processar(50) );
console.log( processar(true) );