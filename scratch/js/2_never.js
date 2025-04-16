function processar(valor) {
    if (typeof valor === "string") {
        return valor.toUpperCase();
    }
    if (typeof valor === "number") {
        return valor.toFixed(2);
    }
    // Se alguém add um novo tipo (ex: boolean) mas esquecer de tratar:
    const valorNaoTratado = valor; // ERRO! Avisa que faltou um caso
}
console.log(processar(5));
const artigo = {
    id: 1,
    titulo: "TypeScript",
    autor: "Professor",
    // dataCriacao: new Date() // Erro, pois dataCriacao não faz parte de ArtigoResumido
};
export {};
