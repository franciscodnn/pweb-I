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

// ---
// Usando modificadores de acesso nos parâmetros do construtor
class Usuario {
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

const usuario = new Usuario("joao123", "senha123", 1);
console.log(usuario.username); // Saída: joao123
// console.log(usuario.password); // Erro: propriedade privada
console.log(usuario.id); // Saída: 1

abstract class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Cachorro extends Animal {
  constructor(nome: string){
    super(nome);
  }
}

const dog: Animal = new Cachorro('totó');

console.log(dog.name)

// ---
type Forma = "círculo" | "quadrado" | "triângulo";

function desenhar(forma: Forma) {
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
      const _exhaustiveCheck: never = forma;
      throw new Error(`Forma desconhecida: ${forma}`);
  }
}

let y: Forma = 'círculo';
// console.log(desenhar('quadrado'));

abstract class Aula {
  protected accessor docente: string;

  constructor(docente: string) {
    this.docente = docente;
  }
}

class AulaPresencial extends Aula {
  constructor(private _disciplina: string, docente: string) {
    super(docente);
  }
  set docente2(nome: string) {
    this.docente = nome;
  }

  get docente2(): string {
    return `Olá, ${this.docente}`;
  }

  get disciplina(): string {
    return `Disciplina: ${this._disciplina}`;
  }
}

let teste: Aula = new AulaPresencial('LS', 'Francisco');
console.log((teste as AulaPresencial).docente2);