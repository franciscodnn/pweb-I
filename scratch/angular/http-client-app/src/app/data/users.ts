export interface User {
  id: number;
  nome: string;
  email: string;
  login: string;
  senha: string;
}

export const USERS: User[] = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    login: 'joao123',
    senha: '123456'
  },
  {
    id: 2,
    nome: 'Maria Santos',
    email: 'maria.santos@email.com',
    login: 'maria456',
    senha: 'senha123'
  },
  {
    id: 3,
    nome: 'Pedro Oliveira',
    email: 'pedro.oliveira@email.com',
    login: 'pedro789',
    senha: 'mypass'
  }
];
