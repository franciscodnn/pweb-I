// Dados de exemplo para as notificações (com CPF como número e valor como inteiro)
const notificacoesMock = [
  {
    tipo: "multa",
    placa: "ABC1234",
    cpf: 12345678900,
    data: "2025-05-10",
    valor: 29347, // R$ 293,47
    descricao: "Excesso de velocidade em via urbana"
  },
  {
    tipo: "advertencia",
    placa: "DEF5678",
    cpf: 98765432100,
    data: "2025-05-08",
    valor: 0, // R$ 0,00
    descricao: "Estacionamento em local proibido - Primeira ocorrência"
  },
  {
    tipo: "multa",
    placa: "GHI9012",
    cpf: 45678912300,
    data: "2025-05-12",
    valor: 15770, // R$ 157,70
    descricao: "Uso do celular durante a condução do veículo"
  },
  {
    tipo: "advertencia",
    placa: "JKL3456",
    cpf: 32165498700,
    data: "2025-05-09",
    valor: 0, // R$ 0,00
    descricao: "Parada em faixa de pedestres - Orientação"
  },
  {
    tipo: "multa",
    placa: "MNO7890",
    cpf: 78912345600,
    data: "2025-05-11",
    valor: 88041, // R$ 880,41
    descricao: "Dirigir sob efeito de álcool"
  }
];

export default notificacoesMock;