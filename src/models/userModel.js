var database = require('../database/config');

// Login
function login(username, password) {
  var query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  return database.execute(query);
}

// Detalhes do usuário por email
function detailByEmail(email){
  var query = `SELECT * FROM usuarios WHERE email = '${email}';`
  return database.execute(query);
}

// Detalhes do usuário por id
function detailById(id){
  var query = `SELECT * FROM usuarios WHERE id = '${id}';`
  return database.execute(query);
}

// Detalhes do usuário por telefone
function detailByPhone(phone){
  var query = `SELECT * FROM usuarios WHERE telefone = '${phone}';`
  return database.execute(query);
}

module.exports = {
  login,
  detailByEmail,
  detailById,
  detailByPhone
};
