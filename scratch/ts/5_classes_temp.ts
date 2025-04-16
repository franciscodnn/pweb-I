// export {};

class Produto {
  // Campo com valor inicial
  nome: string = "Produto sem nome";
  
  // Campo readonly
  readonly codigo: string;
  
  // Campo sem inicializador
  preco: number;
  
  constructor(codigo: string, preco: number) {
    this.codigo = codigo;
    this.preco = preco;
  }
}

const produto = new Produto("P001", 29.99);
console.log(produto.nome); // Saída: Produto sem nome
// produto.codigo = "P002"; // Erro: não pode atribuir a um campo readonly

// produto.codigo = "P002";

class Contador {
  private valor: number = 0;
  
  incrementar(): void {
    this.valor++;
  }
  
  // Problema com 'this' em callbacks
  iniciarContagem() {
    // 'this' será undefined dentro desta função callback
    setTimeout(function() {
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
    setTimeout(function(this: Contador) {
      this.incrementar();
      console.log(this.valor);
    }.bind(this), 1000);
  }
  
  obterValor(): number {
    return this.valor;
  }
}

const contador = new Contador();
contador.incrementar();
// contador.iniciarContagem();
contador.iniciarContagemArrow();
// Após 1 segundo, mostrará: 2