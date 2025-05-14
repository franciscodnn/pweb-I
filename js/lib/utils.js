/**
 * Formata um valor inteiro considerando os dois últimos dígitos como decimais
 * @param {number} valorInteiro - Valor inteiro (ex: 29347 para R$ 293,47)
 * @returns {string} - Valor formatado como moeda brasileira
 */
function formatarMoeda(valorInteiro) {
  // Converte para decimal: divide por 100
  const valorDecimal = valorInteiro / 100;
  return valorDecimal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

/**
 * Formata uma data no padrão brasileiro
 * @param {string} dataString - Data no formato YYYY-MM-DD
 * @returns {string} - Data no formato DD/MM/YYYY
 */
function formatarData(dataString) {
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR');
}

/**
 * Formata um CPF com a máscara padrão
 * @param {number} cpfNumero - CPF sem pontuação (apenas números)
 * @returns {string} - CPF formatado (123.456.789-00)
 */
function formatarCPF(cpfNumero) {
  // Converte para string e garante que tenha 11 dígitos com zeros à esquerda
  const cpfString = cpfNumero.toString().padStart(11, '0');
  
  // Aplica a máscara XXX.XXX.XXX-XX
  return cpfString.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export { formatarMoeda, formatarData, formatarCPF };