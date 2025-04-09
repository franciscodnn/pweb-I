interface Usuario{
    nome: string,
    idade: number,
    email?: string
};

let usuario = createUser("Maria", 25, "maria@ifpb.edu.br");

let user2: Usuario = {
    nome: "José",
    idade: 30
};

console.log( print(usuario) );

function createUser(
    nome: string,
    idade: number,
    email: string
): Usuario {

    return {
        nome,
        idade,
        email
    };
}

function print(user: Usuario) {

    console.log(user);

    return "Impressão realizada!";

}