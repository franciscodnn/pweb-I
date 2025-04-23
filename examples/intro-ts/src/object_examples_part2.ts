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

const conta: Conta = new Conta();
// conta.saldo = -100;

// console.log( conta.saldo );

// -----
class Utilitarios {
    // Propriedade estática
    static PI: number = 3.14159;

    // Método estático
    static calcularAreaCirculo(raio: number): number {
        return Utilitarios.PI * raio * raio;
    }

    // Método estático que usa outro membro estático
    static calcularCircunferenciaCirculo(raio: number): number {
        return 2 * Utilitarios.PI * raio;
    }

    // Propriedade estática com getter
    static get versao(): string {
        return "1.0.0";
    }
}

// Uso sem instanciar a classe
console.log(Utilitarios.PI); // Saída: 3.14159
console.log(Utilitarios.calcularAreaCirculo(5)); // Saída: 78.53975
console.log(Utilitarios.versao); // Saída: 1.0.0P

const util1: Utilitarios = new Utilitarios();
const util2: Utilitarios = new Utilitarios();
const util3: Utilitarios = new Utilitarios();
const util4: Utilitarios = new Utilitarios();

console.log( Utilitarios.PI );
