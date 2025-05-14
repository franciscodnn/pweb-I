import { criarCardNotificacao } from './components/notificationCard.js';
import notificacoesMock from './data.js';


// Função para renderizar todos os cards
function renderizarCards() {
  const grid = document.getElementById('notificationGrid');
  grid.innerHTML = '';
  
  notificacoesMock.forEach(notificacao => {
    const card = criarCardNotificacao(notificacao);
    grid.appendChild(card);
  });
}

// Função para abrir o Off Canvas
function abrirOffCanvas() {
  document.getElementById('offCanvas').style.right = '0';
}

// Função para fechar o Off Canvas
function fecharOffCanvas() {
  document.getElementById('offCanvas').style.right = '-480px';
}

// Função para remover formatação do CPF, mantendo apenas números
function limparCPF(cpfFormatado) {
  return parseInt(cpfFormatado.replace(/\D/g, ''));
}

// Função para adicionar nova notificação
function adicionarNotificacao(event) {
  event.preventDefault();
  
  const novaNotificacao = {
    tipo: document.getElementById('tipo').value,
    placa: document.getElementById('placa').value.toUpperCase(),
    cpf: limparCPF(document.getElementById('cpf').value),
    data: document.getElementById('data').value,
    valor: parseInt(document.getElementById('valor').value) || 0,
    descricao: document.getElementById('descricao').value
  };
  
  notificacoesMock.unshift(novaNotificacao);
  renderizarCards();
  fecharOffCanvas();
  document.getElementById('notificationForm').reset();
}

// Função para adicionar máscara ao CPF durante digitação
function mascaraCPF(input) {
  let valor = input.value.replace(/\D/g, '');
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  input.value = valor;
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Renderizar cards iniciais
  renderizarCards();
  
  // Configurar botão para abrir o Off Canvas
  document.getElementById('addNotificationBtn').addEventListener('click', abrirOffCanvas);
  
  // Configurar botão para fechar o Off Canvas
  document.getElementById('closeOffCanvasBtn').addEventListener('click', fecharOffCanvas);
  
  // Configurar envio do formulário
  document.getElementById('notificationForm').addEventListener('submit', adicionarNotificacao);
  
  // Adicionar máscara ao CPF
  const cpfInput = document.getElementById('cpf');
  cpfInput.addEventListener('input', () => mascaraCPF(cpfInput));
});