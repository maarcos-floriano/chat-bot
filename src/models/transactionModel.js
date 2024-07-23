var database = require("../database/config");

// Buscar transações de uma conta
function findByAccountNumber(accountNumber) {
  var query = `SELECT * FROM transacoes WHERE conta_id = (SELECT conta_id FROM contas WHERE numero_conta = '${accountNumber}');`;
  return database.execute(query);
}

//Buscar transações de um usuário
function findByUserEmail(email) {
  var query = `SELECT t.* FROM transacoes t
  JOIN contas c ON t.conta_id = c.conta_id
  WHERE c.usuario_id = (SELECT usuario_id FROM usuarios WHERE email = '${email}');`;
  return database.execute(query);
}

// Buscar transações por tipo de transação
function findByType(type) {
  var query = `SELECT * FROM transacoes WHERE tipo_transacao = '${tipo_transacao}' AND conta_id = (SELECT conta_id FROM contas WHERE numero_conta = '${type}');`
  return database.execute(query);
}

module.exports = {
  findByAccountNumber,
  findByUserEmail,
  findByType
};