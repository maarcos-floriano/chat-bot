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

function create(user){
  var query = `INSERT INTO usuarios (nome, email, telefone, senha) VALUES ('${user.name}', '${user.email}', '${user.phone}', '${user.password}');`
  return database.execute(query);
}

function update(user){
  var query = `UPDATE usuarios SET nome = '${user.name}', email = '${user.email}', telefone = '${user.phone}', senha = '${user.password}' WHERE id = ${user.id};`
  return database.execute(query);
}

function remove(id){
  var query = `DELETE FROM usuarios WHERE id = ${id};`
  return database.execute(query);
}

module.exports = {
  login,
  detailByEmail,
  detailById,
  detailByPhone,
  create,
  update,
  remove
};
