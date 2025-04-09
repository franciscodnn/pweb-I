let algumValor: unknown = 5;

// let comprimento: number = (algumValor as string).length;
// ou
// let comprimento: number = (<string>algumValor).length;

let comprimento: number = (String(algumValor)).length;

console.log(comprimento);

console.log( typeof algumValor );