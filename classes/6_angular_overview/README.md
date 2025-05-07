[main](../../README.md)

# Aula 6 - Resumo Angular: Visão Geral e Instalação

## Visão Geral do Angular

* **O que é**: Framework JavaScript para construção de aplicações web
* **Características principais**:
  * Baseado em componentes reutilizáveis
  * Sistema de templates declarativo
  * Gerenciamento de estado eficiente
  * Ferramentas de desenvolvimento robustas
  * Aplicações web SPA, SSR e PWA

## Arquitetura Angular

* **Componentes**: Blocos de construção fundamentais que combinam:
  * Templates HTML
  * Lógica em TypeScript
  * Estilos CSS específicos
* **Serviços**: Classes para compartilhar funcionalidades entre componentes
* **Injeção de Dependências**: Sistema que torna componentes mais testáveis e modulares

## Vantagens do Angular

* Framework completo e opinativo com soluções integradas
* Suporte a TypeScript para maior segurança de tipo
* Comunidade ativa e suporte corporativo da Google
* Ferramental completo via Angular CLI

## Instalação do Angular

* **Pré-requisitos**:
  * Node.js (versão LTS recomendada)
  * npm (gerenciador de pacotes)

* **Instalar Angular CLI globalmente**:
  ```
  npm install -g @angular/cli
  ```

* **Instalar Angular CLI localmente (alternativa)**:
  ```
  npm install @angular/cli
  ```

* **Criar novo projeto com CLI global**:
  ```
  ng new my-app
  ```

* **Criar novo projeto com CLI local**:
  ```
  npx ng new my-app
  ```

* **Opções de configuração durante criação**:
  * Sistema de roteamento (sim/não)
  * Formato de estilização (CSS, SCSS, SASS, LESS)

* **Executar a aplicação com CLI global**:
  ```
  cd my-app
  ng serve
  ```

* **Executar a aplicação com CLI local**:
  ```
  cd my-app
  npx ng serve
  ```
  * Acessar `http://localhost:4200/` no navegador

## Estrutura básica do projeto

* `/src/app`: Contém componentes, serviços e módulos
* `/src/assets`: Para arquivos estáticos
* `/src/environments`: Configurações de ambiente
* `angular.json`: Configuração do workspace
* `package.json`: Dependências e scripts

## Primeiros Passos

* Modificar `app.component.ts` e arquivos relacionados
* Criar novos componentes:
  * Com CLI global: `ng generate component nome-componente`
  * Com CLI local: `npx ng generate component nome-componente`
* Explorar a documentação completa em angular.dev