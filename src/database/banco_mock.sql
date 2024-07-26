-- Active: 1721136933005@@127.0.0.1@3306@banco_mock

-- Cria o banco de dados
CREATE DATABASE IF NOT EXISTS banco_mock;

-- Cria um novo usuário
CREATE USER 'novo_usuario'@'localhost' IDENTIFIED BY 'senha_segura';

-- Concede todas as permissões no banco de dados banco_mock para o novo usuário
GRANT ALL PRIVILEGES ON banco_mock.* TO 'novo_usuario'@'localhost';

-- Aplica as alterações
FLUSH PRIVILEGES;

USE banco_mock;

-- Cria a tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf BIGINT NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(15),
    endereco VARCHAR(255),
    data_nascimento DATE
);

-- Cria a tabela de contas
CREATE TABLE IF NOT EXISTS contas (
    conta_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    numero_conta VARCHAR(20) NOT NULL UNIQUE,
    tipo_conta ENUM('corrente', 'poupanca') NOT NULL,
    saldo DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    data_abertura DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

-- Cria a tabela de transações
CREATE TABLE IF NOT EXISTS transacoes (
    transacao_id INT AUTO_INCREMENT PRIMARY KEY,
    conta_id INT,
    tipo_transacao ENUM('deposito', 'retirada', 'transferencia') NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data_transacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descricao VARCHAR(255),
    FOREIGN KEY (conta_id) REFERENCES contas(conta_id)
);

-- Cria a tabela de chats
CREATE TABLE IF NOT EXISTS chats (
    chat_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    data_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_fim TIMESTAMP,
    status ENUM('aberto', 'fechado') DEFAULT 'aberto',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

-- Cria a tabela de mensagens
CREATE TABLE IF NOT EXISTS mensagens (
    mensagem_id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT,
    usuario_id INT,
    tipo_usuario ENUM('cliente', 'bot') NOT NULL,
    mensagem TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chats(chat_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);

INSERT INTO usuarios (nome, email, senha, cpf, telefone, endereco, data_nascimento) VALUES
('João Silva', 'joao.silva@example.com', 'senha123', '11999999999', 'Rua A, 123', '1990-01-01'),
('Maria Oliveira', 'maria.oliveira@example.com', 'senha456', '21999999999', 'Rua B, 456', '1985-05-05'),
('Carlos Souza', 'carlos.souza@example.com', 'senha789', '31999999999', 'Rua C, 789', '1992-03-03');

INSERT INTO contas (usuario_id, numero_conta, tipo_conta, saldo, data_abertura) VALUES
(1, '123456-7', 'corrente', 1500.00, '2020-01-01'),
(2, '234567-8', 'poupanca', 3000.00, '2019-05-10'),
(1, '345678-9', 'corrente', 500.00, '2021-07-15');

INSERT INTO transacoes (conta_id, tipo_transacao, valor, data_transacao, descricao) VALUES
(1, 'deposito', 1500.00, '2020-01-01 10:00:00', 'Depósito inicial'),
(1, 'retirada', 200.00, '2020-02-01 11:00:00', 'Retirada no caixa eletrônico'),
(2, 'deposito', 3000.00, '2019-05-10 09:30:00', 'Depósito inicial'),
(3, 'transferencia', 300.00, '2021-08-01 14:20:00', 'Transferência para outra conta');

INSERT INTO chats (usuario_id, data_fim, status) VALUES
(1, '2023-06-01 10:00:00', 'fechado'),
(2, '2023-06-02 12:00:00', 'fechado'),
(1, NULL, 'aberto');

INSERT INTO mensagens (chat_id, usuario_id, tipo_usuario, mensagem, data_envio) VALUES
(1, 1, 'cliente', 'Olá, eu preciso de ajuda com minha conta.', '2023-06-01 09:00:00'),
(1, 1, 'bot', 'Claro, como posso ajudar?', '2023-06-01 09:01:00'),
(2, 2, 'cliente', 'Como faço uma transferência?', '2023-06-02 11:30:00'),
(2, 2, 'bot', 'Você pode fazer uma transferência pelo nosso aplicativo.', '2023-06-02 11:31:00'),
(3, 1, 'cliente', 'Qual é o saldo da minha conta?', '2024-07-01 08:00:00'),
(3, 1, 'bot', 'Seu saldo é de R$ 500,00.', '2024-07-01 08:01:00');
