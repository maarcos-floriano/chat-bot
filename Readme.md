# Chat-Bot

Este repositório contém um exemplo de sistema de chat-bot desenvolvido com Node.js no padrão MVC para o backend, React para o frontend e MySQL como banco de dados. Todos os componentes são executados em contêineres Docker conectados via Docker Compose.

## Estrutura do Projeto

- **Backend (Node.js MVC)**: Implementa a lógica do chat-bot, processando as mensagens dos usuários e interagindo com o banco de dados MySQL.
- **Frontend (React)**: Interface de usuário que exibe o chat e permite a interação com o bot.
- **Banco de Dados (MySQL)**: Armazena os dados dos usuários e as interações do chat.

## Funcionalidades Principais

1. **Interação com o Chat-Bot**:
   - **Mensagens de Boas-Vindas**: O bot inicia a conversa com uma saudação e pergunta como pode ajudar.
   - **Opções de Ajuda**: O bot oferece opções de ajuda, como informações de transação, conta e perfil.
   - **Validação de CPF e Email**: O bot solicita e valida o CPF e email do usuário.
   - **Informações do Usuário**: O bot busca informações de conta, perfil e transações do usuário no banco de dados.

2. **Endpoints da API**:
   - **Criação de Usuário**:
     - `POST /user/create`: Cria um novo usuário no banco de dados.
   - **Busca de Usuário por CPF**:
     - `GET /user/detailByCpf/:cpf`: Busca detalhes do usuário pelo CPF.
   - **Busca de Conta por Email**:
     - `GET /account/findAllByUserEmail/:email`: Busca contas associadas ao email do usuário.
   - **Busca de Transações por Email**:
     - `GET /transaction/findByUserEmail/:email`: Busca transações associadas ao email do usuário.

## Como Executar o Projeto

1. **Configurar o Docker e Docker Compose**:

   - Certifique-se de ter Docker e Docker Compose instalados.
   - Use o Docker Compose para iniciar todos os contêineres:
     ```bash
     docker-compose up -d
     ```

2. **Backend (Node.js)**:

   - Certifique-se de ter Node.js e npm instalados.
   - Instale as dependências do backend:
     ```bash
     npm install
     ```
   - Inicie o servidor Node.js:
     ```bash
     npm run dev
     ```

3. **Frontend (React)**:

   - Certifique-se de ter Node.js e npm instalados.
   - Instale as dependências do frontend:
     ```bash
     npm install
     ```
   - Inicie o servidor de desenvolvimento React:
     ```bash
     npm run dev
     ```

## Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript para o backend.
- **Express**: Framework web para Node.js.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **MySQL**: Banco de dados relacional para armazenamento de dados.
- **Docker**: Plataforma para containerização de aplicações.
- **Docker Compose**: Ferramenta para definir e gerenciar multi-contêineres Docker.

## Contribuição

Contribuições são bem-vindas! Para sugestões ou problemas encontrados, abra uma issue neste repositório.

## Contato

Para mais informações, entre em contato através do [maarcos-floriano](mailto:marcos.floriano@sptech.school) || [Sant-Thiago](mailto:thiago.santos@sptech.school).
