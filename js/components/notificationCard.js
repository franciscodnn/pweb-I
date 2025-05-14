import { formatarCPF, formatarMoeda, formatarData } from "../lib/utils.js";

/**
 * Cria um componente de card de notificação usando template literals
 * @param {Object} notificacao - Objeto com dados da notificação
 * @returns {HTMLElement} - Elemento do card gerado
 */
function criarCardNotificacao(notificacao) {
  const tipoIndicatorClass = notificacao.tipo === 'multa' ? 'bg-multa' : 'bg-advertencia';
  const titulo = notificacao.tipo === 'multa' ? 'Notificação de Multa' : 'Notificação de Advertência';
  
  // Template do card usando template literals
  const template = `
    <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 relative hover:translate-y-[-4px]">
      <h2 class="text-xl font-semibold mb-4 text-secondary">${titulo}</h2>
      
      <div class="grid grid-cols-[auto,1fr] gap-y-2 gap-x-4 mb-4">
        <span class="text-sm text-gray-500 font-medium">Placa:</span>
        <span class="text-sm">${notificacao.placa}</span>
        
        <span class="text-sm text-gray-500 font-medium">CPF:</span>
        <span class="text-sm">${formatarCPF(notificacao.cpf)}</span>
        
        <span class="text-sm text-gray-500 font-medium">Data:</span>
        <span class="text-sm">${formatarData(notificacao.data)}</span>
        
        <span class="text-sm text-gray-500 font-medium">Valor:</span>
        <span class="text-sm">${formatarMoeda(notificacao.valor)}</span>
      </div>
      
      <div class="text-sm text-gray-500 font-medium mb-1">Descrição:</div>
      <div class="text-sm text-gray-700 leading-relaxed">${notificacao.descricao}</div>
      
      <div class="absolute bottom-4 right-4 w-3 h-3 rounded-full ${tipoIndicatorClass}"></div>
    </div>
  `;
  
  // Criar um elemento temporário para converter a string HTML em elemento DOM
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = template.trim();
  
  // Retorna o primeiro filho como elemento DOM
  return tempContainer.firstElementChild;
}

export { criarCardNotificacao };