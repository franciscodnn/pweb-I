import { areaCirculo } from './2_area_circulo';

let pi: unknown = "3.14";
let raio = "10";

console.log( (areaCirculo(pi as number, Number(raio))) );