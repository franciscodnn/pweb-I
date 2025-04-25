class Veiculo {
    constructor(
        protected marca: string,
        protected modelo: string,
        protected ano: number
    ) { }

    descricao(): string {
        return `${this.marca} ${this.modelo} (${this.ano})`;
    }

    idade(anoAtual: number = new Date().getFullYear()): number {
        return anoAtual - this.ano;
    }
}

class Carro extends Veiculo {
    constructor(
        marca: string,
        modelo: string,
        ano: number,
        private numPortas: number
    ) {
        // Chama o construtor da classe pai
        super(marca, modelo, ano);
    }

    // Sobrescreve o método da classe pai
    descricao(): string {
        // Usa o método da classe pai com super
        return `${super.descricao()} - ${this.numPortas} portas`;
    }

    // Método específico desta subclasse
    abrirPortas(): string {
        return `Abrindo ${this.numPortas} portas`;
    }
}

class Moto extends Veiculo {
    constructor(
        marca: string,
        modelo: string,
        ano: number,
        private cilindradas: number
    ) {
        super(marca, modelo, ano);
    }

    descricao(): string {
        return `${super.descricao()} - ${this.cilindradas}cc`;
    }
}

const meuCarro: Veiculo = new Carro("Toyota", "Corolla", 2020, 4);
const minhaMoto = new Moto("Honda", "CB500", 2022, 500);

// console.log(meuCarro.descricao());

// console.log((meuCarro as Carro).abrirPortas());

// console.log(meuCarro.descricao()); // Saída: Toyota Corolla (2020) - 4 portas
// console.log(minhaMoto.descricao()); // Saída: Honda CB500 (2022) - 500cc
// console.log(meuCarro.idade()); // Saída: 5 (considerando 2025)
// console.log(meuCarro.abrirPortas()); // Saída: Abrindo 4 portas

abstract class Forma {
    constructor(protected cor: string) { }

    // Método comum com implementação
    descricao(): string {
        return `Uma forma ${this.cor}`;
    }

    // Método abstrato que deve ser implementado pelas subclasses
    abstract calcularArea(): number;

    // Método abstrato com parâmetro
    abstract redimensionar(fator: number): void;
}

class Retangulo extends Forma {

    constructor(
        cor: string,
        private largura: number,
        private altura: number
    ) {
        super(cor);
    }

    redimensionar(fator: number): void {
        this.altura = this.altura * fator;
        this.largura *= fator;
    }

    // redimensionar(fator: number, eixo: "altura" | "larguta"): void {
    //     if(eixo === "altura"){ 
    //         this.altura *= fator;
    //         return;
    //     }
    //     this.largura *= fator;

    // }

    calcularArea(): number {
        return this.altura * this.largura;
    }

    // Método adicional específico desta classe
    calcularPerimetro(): number {
        return 2 * (this.largura + this.altura);
    }
}

const forma: Forma = new Retangulo(
    "blue", 2, 3
);

console.log((forma as Retangulo).calcularPerimetro());

// -----
class Contador {
    private valor: number = 0;

    incrementar(): void {
        // this.valor++;
        console.log(this.valor++);
    }

    // Problema com 'this' em callbacks
    iniciarContagem() {
        // 'this' será undefined dentro desta função callback
        setTimeout(function () {
            this.incrementar(); // Erro: this.incrementar is not a function
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
        setTimeout(function (this: Contador) {
            this.incrementar();
            console.log(this.valor);
        }.bind(this), 1000);
    }

    obterValor(): number {
        return this.valor;
    }
}

new Contador().incrementar();
// new Contador().iniciarContagem();
new Contador().iniciarContagemBind();

// -----
abstract class Documento {

}

interface Printavel {
    imprimir(): string;
}

class DocumentoPDF extends Documento implements Printavel {
    imprimir(): string {
        return 'imprimir na impressora';
    }
}

class DocumentoHTML extends Documento implements Printavel {
    imprimir(): string {
        return `Convertendo para PDF`;
    }
}
