export {};

function processar(valor: string | number ) {
  if (typeof valor === "string") {
    return valor.toUpperCase();
  }
  if (typeof valor === "number") {
    return valor.toFixed(2);
  }
  
  // Se alguém add um novo tipo (ex: boolean) mas esquecer de tratar:
  const valorNaoTratado: never = valor; // ERRO! Avisa que faltou um caso
}

console.log( processar(5) );

interface Artigo {
  id: number;
  titulo: string;
  conteudo: string;
  autor: string;
  dataCriacao: Date;
}

type ArtigoResumido = Pick<Artigo, "id" | "titulo" | "autor">;

const artigo: ArtigoResumido = {
  id: 1,
  titulo: "TypeScript",
  autor: "Professor",
  // dataCriacao: new Date() // Erro, pois dataCriacao não faz parte de ArtigoResumido
}