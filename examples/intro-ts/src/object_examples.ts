function saudar(
    pessoa: {
        nome: string;
        idade: unknown
    }): string {
    return `Olá ${pessoa.nome}, você tem ${pessoa.idade} anos!`;
}

// console.log(saudar(
//     {
//         nome: "Francisco",
//         idade: 38
//     }
// ));

interface Pessoa {
    nome: string;
    idade: number;
    endereco?: string;  // Propriedade opcional
}

const pessoa: Pessoa = {
    nome: "Maria",
    idade: 50
};

pessoa.endereco = "Av. Primeiro de Maio, 720";

// console.log(pessoa.endereco);

interface Animal {
    nome: string;
}

interface Cachorro extends Animal {
    raca: string;
    latir(): void;
}

const cachorro: Cachorro = {
    nome: "Totó",
    raca: "vira-lata",
    latir: (): void => console.log("Latir")

}

// cachorro.latir();

type Usuario = { nome: string; idade: number };
type Empregado = { empresa?: string; cargo: string };

type Funcionario = Usuario & Required<Empregado>;

const funcionario: Funcionario = {
    nome: "João",
    idade: 30,
    empresa: "TechCorp",
    cargo: "Desenvolvedor"
};

type ID = string | number;

let uuid: ID = 123;
uuid = "aabu123";
// uuid = true;

// -----
class UsuarioNovo {
    constructor(
        public username: string,
        private password: string,
        readonly id: number
    ) {
        // O código acima automaticamente cria e inicializa as propriedades
    }

    verificarSenha(senha: string): boolean {
        return this.password === senha;
    }
}

let newUser: UsuarioNovo = new UsuarioNovo(
    "dantas.nobre",
    "password123",
    123
);

console.log(
    // newUser.verificarSenha("password1234")
    newUser.id
);