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

module.exports = {
  findByAccountNumber,
  findAllByUserEmail,
  checkBalance
};