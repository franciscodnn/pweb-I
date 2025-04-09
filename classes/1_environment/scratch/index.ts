export {};

// const x: string = 'abcd';

// const y = (v: string) => v as unknown as number;

// const z = Number(y(x));

// console.log( typeof z, z );

// -----
interface Disciplina {
  titulo: string,
  CH: number,
  pre_requisitos: string
};

const disciplina:Disciplina = {
  titulo: "PWEB I",
  // CH: "80" as unknown as number,
  CH: 80,
  pre_requisitos: "LS, BD, POO"
};

console.log( disciplina );

type NovoTipo = "a" | "b" | "c";

const x: NovoTipo = "c";

console.log( x );