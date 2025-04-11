function soma(op1: number, op2: number):number {
    return op1 + op2;
}

function calculadora(op1: number, 
    op2: number, operador: string = '+'): number {
        console.log(operador);
        return 0;
}



calculadora(1, 2);
calculadora(1, 2, '/');

// console.log( soma(2, 3) );

// --- tipos de variáveis

let uniao: (string | number);
uniao = 'teste';
uniao = 5;
// uniao = true; // erro

let metodosHTTPSuportados: "GET" | "POST" | "DELETE";

metodosHTTPSuportados = "GET";

// Type e Interface
type ID = number | string;

let uuid: ID;
uuid = 10;
uuid = "abcd30xy";
// uuid = true; // erro

type Disciplina = {
    titulo?: string,
    cod: string | number,
    CH: number
};

type Docente = {
    nome: string,
    email: string
};

type DocenteDisciplina = Disciplina & Docente;

let dd: DocenteDisciplina = {
    cod: 3354,
    CH: 67,
    email: "teste@ifpb.edu.br",
    nome: "Francisco"
}

// console.log( dd );

interface Carro {
    nome: string,
    autonomiaKM: number,
    cor: string,
    andar(): string
};

let carro: Carro = {
    nome: "Celta",
    autonomiaKM: 500,
    cor: "Prata",
    andar() {
        return "Carro está andando";
    }
}

console.log( carro.andar() );

let carroDadosParciais: Partial<Carro> = {
    nome: "Gol",
    cor: "Branco"
};

// Function

function somaVarios(...numeros: number[]): number {
    let resultado: number = 0;

    for(const n of numeros){
        resultado += n as number;
    }

    return resultado;
}

somaVarios(3, 5);
console.log( somaVarios(3, 5, 8, 10) );