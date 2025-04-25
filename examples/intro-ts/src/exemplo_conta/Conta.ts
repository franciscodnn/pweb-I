abstract class Conta {
    constructor(
        private usuario: string,
        private _saldo: number,
        private numero: string,
        private agencia: string
    ) {

    }

    get saldo(): number {
        return this._saldo;
    }

    set saldo(saldo: number) {
        this._saldo = this.saldo;
    }
}

class ContaPoupanca extends Conta {
    private codigo: number;    
}

class ContaSalario extends Conta {
    private existeMovimentacao: boolean = false;
}

class ContaCorrente extends Conta {
    private taxaDeManutencao: number = 5;    
}

class Usuario {
    private contas: Conta[];

    adicionar(conta: Conta) {
        this.contas.push(conta);
    }

    obterSaldoTodasAsContas(): number {
        let resultado = 0;

        this.contas.forEach(
            (conta) => {
                resultado += conta.saldo;
            }
        );

        return resultado;
    }
}