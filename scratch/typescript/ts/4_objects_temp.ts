export {};

interface Usuario {
  nome: string;
  email: string;
}

const usuarioImutavel: Readonly<Usuario> = {
  nome: "Carlos",
  email: "carlos@example.com"
};

// let colors: Record<'true' | 'false', string> = {
//   // azul: "#00F",
//   // vermelho: "#F00"
//   true: "teste",
//   false: "teste2"
// }

// // usuarioImutavel.nome = "Teste";

// console.log(colors['true']);

let colors = new Map<boolean, string>(
  [
    [true, 'sim'],
    [false, 'não']
  ]
);
colors.set(true, 'yes');
console.log(colors.get(true));

type Coordenada = [number, Function];

const ponto: Coordenada = $_useState(50);

console.log(ponto[0]);

function $_useState(x: number): Coordenada {
  return [x, () => x];
}

// -----
class Conta {
  private _saldo: number = 0;
  
  // Getter
  get saldo(): number {
    console.log("Saldo consultado");
    return this._saldo;
  }
  
  // Setter
  set saldo(valor: number) {
    if (valor < 0) {
      console.error("Não é possível definir um saldo negativo");
      return;
    }
    console.log(`Saldo alterado de ${this._saldo} para ${valor}`);
    this._saldo = valor;
  }
  
  // Propriedade somente leitura (apenas getter)
  get saldoEmDolar(): number {
    // Taxa de câmbio fictícia
    return this._saldo / 5;
  }
}

const minhaConta = new Conta();
minhaConta.saldo = 1000; // Chama o setter
console.log(minhaConta.saldo); // Chama o getter, Saída: 1000
console.log(minhaConta.saldoEmDolar); // Saída: 200
minhaConta.saldo = -100; // Erro no console, saldo não é alterado