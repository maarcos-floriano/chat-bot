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

module.exports = {
  login,
  detailByEmail,
  detailById,
  detailByPhone
};