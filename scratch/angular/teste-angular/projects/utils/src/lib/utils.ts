/**
 * Formata um número como moeda brasileira (BRL).
 * @param currency O valor em centavos a ser formatado.
 * @returns Uma string representando o valor formatado como moeda.
 */
export function formatCurrency(currency: number): string {
  return (currency / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

/**
 * Formata uma data no formato brasileiro (dd/mm/aaaa).
 * @param date A data em formato de string (ISO ou similar).
 * @returns Uma string representando a data formatada.
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR');
}