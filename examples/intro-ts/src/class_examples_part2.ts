// TypeScript com verificação de tipos
class ExemploTS {
    private valorPrivado: string = "secreto";
    public valorPublico: number = 42;

    constructor() {
        // TypeScript impede acesso inadequado durante o desenvolvimento
        console.log(this.valorPrivado); // OK
    }
}

const exemplo = new ExemploTS();
// console.log(exemplo.valorPrivado); // Erro em TypeScript: propriedade é privada
console.log(exemplo.valorPublico); // OK: 42