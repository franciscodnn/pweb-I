export default function areaCirculo(raio: number): string {
  let resultado: number = Math.PI * (raio ** 2);
  return resultado.toFixed(2);
}