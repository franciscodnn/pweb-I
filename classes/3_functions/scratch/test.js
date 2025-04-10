function greeter(fn) {
    fn("Hello World");
}
// greeter((b) => console.log(b));
export {};

function funcA(x){
    return x;
}

funcA.prop = 'Teste';

console.log(funcA.prop, funcA(5));