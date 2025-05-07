export {};

function log(target: any, propertyKey: string, descriptor: PropertyDescriptor){
    console.log(`Função ativada, ${propertyKey}`);
}

class Teste {

    @log
    print() {
        console.log('imprimindo algo na tela...');
    }
}

const t = new Teste();
t.print();