function loopInfinito(): never {
    console.log('teste');
    // let i: number = 0;
    // while (true) {
    //   console.log(i++);
    // }

    // // return 'término da função';
}

loopInfinito();

function print(valor: string | number): never {

    let tipo: string = typeof valor;

    switch(tipo){
        case 'string':
            console.log('o valor é string');
            break;
        
        case 'number':
            console.log('o valor é number');
            break;
    }
}