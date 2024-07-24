var database = require("../database/config");

// Buscar chats abertos de um usuário
function findOpenChats(email) {
  var query = `SELECT * FROM chats WHERE usuario_id = (SELECT usuario_id FROM usuarios WHERE email = '${email}') AND status = 'aberto';`;
  return database.execute(query);
}

//Buscar chats por status
function findByStatus(status) {
  var query = `SELECT * FROM chats WHERE status = '${status}';`;
  return database.execute(query);
}

// Buscar mensagens de um chat
function findMessages(chatId) {
  var query = `SELECT * FROM mensagens WHERE chat_id = ${chatId};`;
  return database.execute(query);
}

// Criar um chat
function createChat(email) {
  var query = `INSERT INTO chats (usuario_id, status) VALUES ((SELECT usuario_id FROM usuarios WHERE email = '${email}'), 'aberto');`;
  return database.execute(query);
}

// Criar uma mensagem
function createMessage(chatId, message) {
  var query = `INSERT INTO mensagens (chat_id, mensagem) VALUES (${chatId}, '${message}');`;
  return database.execute(query);
}


//Fechar um chat
function closeChat(chatId) {
  var query = `UPDATE chats SET status = 'fechado' WHERE chat_id = ${chatId};`;
  return database.execute(query);
}

//Atualizar mensagem de um chat
function updateMessage(messageId, message) {
  var query = `UPDATE mensagens SET mensagem = '${message}' WHERE mensagem_id = ${messageId};`;
  return database.execute(query);
}

module.exports = {
  findOpenChats,
  findByStatus,
  findMessages,
  createChat,
  createMessage,
  closeChat,
  updateMessage
};