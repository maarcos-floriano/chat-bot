var userModel = require('../models/userModel');

function login(req, res) {

  var username = req.body.username;
  var password = req.body.password;

  userModel.login(username, password)
    .then((result) => {

      if (result.length > 0) {
        res.status(200).send('Usuário logado com sucesso!');
      } else {
        res.status(401).send('Usuário ou senha inválidos!');
      }

    })
    .catch((error) => {

      res.status(500).send('Erro ao logar: ' + error);

    });
}

function detailByCPF(req, res) {

  var cpf = req.params.cpf;

  userModel.detailByCPF(cpf)
    .then((result) => {

      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Usuário não encontrado!');
      }

    })
    .catch((error) => {

      res.status(500).send('Erro ao buscar usuário: ' + error);

    });
}

function detailByEmail(req, res) {

  var email = req.params.email;

  userModel.detailByEmail(email)
    .then((result) => {

      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Usuário não encontrado!');
      }

    })
    .catch((error) => {

      res.status(500).send('Erro ao buscar usuário: ' + error);

    });
}

function detailById(req, res) {

  var id = req.params.id;

  userModel.detailById(id)
    .then((result) => {

      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Usuário não encontrado!');
      }

    })
    .catch((error) => {

      res.status(500).send('Erro ao buscar usuário: ' + error);

    });
}

function detailByPhone(req, res) {

  var phone = req.params.phone;

  userModel.detailByPhone(phone)
    .then((result) => {

      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Usuário não encontrado!');
      }

    })
    .catch((error) => {

      res.status(500).send('Erro ao buscar usuário: ' + error);

    });
}

function create(req, res) {

  var user = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  };

  userModel.create(user)
    .then((result) => {

      res.status(201).send('Usuário criado com sucesso!');

    })
    .catch((error) => {

      res.status(500).send('Erro ao criar usuário: ' + error);

    });
}

function update(req, res) {

  var user = {
    id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  };

  userModel.update(user)
    .then((result) => {

      res.status(200).send('Usuário atualizado com sucesso!');

    })
    .catch((error) => {

      res.status(500).send('Erro ao atualizar usuário: ' + error);

    });
}

function remove(req, res) {

  var id = req.params.id;

  userModel.remove(id)
    .then((result) => {

      res.status(200).send('Usuário removido com sucesso!');

    })
    .catch((error) => {

      res.status(500).send('Erro ao remover usuário: ' + error);

    });
}

module.exports = {
  login,
  detailByCPF,
  detailByEmail,
  detailById,
  detailByPhone,
  create,
  update,
  remove
};