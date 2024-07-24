var database = require('../database/config');

// Busca conta por número da conta
function findByAccountNumber(accountNumber) {
  var query = `SELECT * FROM contas WHERE numero_conta = '${accountNumber}';`
  return database.execute(query);
}

// Buscar todas as contas de um usuário
function findAllByUserEmail(email) {
  var query = `SELECT * FROM contas WHERE usuario_id = (SELECT usuario_id FROM usuarios WHERE email = '${email}');`
  return database.execute(query);
}

// Verificar Saldo da conta
function checkBalance(accountNumber) {
  var query = `SELECT saldo FROM contas WHERE numero_conta = '${accountNumber}';`
  return database.execute(query);
}

// Criar conta
function createAccount(user) {
  var query = `INSERT INTO contas (usuario_id, saldo) VALUES ((SELECT usuario_id FROM usuarios WHERE email = '${user.email}'), 0);`
  return database.execute(query);
}

// Atualizar saldo da conta
function updateBalance(accountNumber, value) {
  var query = `UPDATE contas SET saldo = ${value} WHERE numero_conta = '${accountNumber}';`
  return database.execute(query);
}

module.exports = {
  findByAccountNumber,
  findAllByUserEmail,
  checkBalance,
  createAccount,
  updateBalance
};