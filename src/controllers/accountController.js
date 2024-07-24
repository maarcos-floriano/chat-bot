var accountModel = require('../models/accountModel');

// findByAccountNumber
function findByAccountNumber(req, res) {

  var accountNumber = req.params.accountNumber;

  accountModel.findByAccountNumber(accountNumber)
    .then((result) => {

      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Conta não encontrada!');
      }

    })
    .catch((error) => {

      res.status(500).send('Erro ao buscar conta: ' + error);

    });
}

// findAllByUserEmail
function findAllByUserEmail(req, res) {

  var email = req.params.email;

  accountModel.findAllByUserEmail(email)
    .then((result) => {

      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Conta não encontrada!');
      }

    })
    .catch((error) => {

      res.status(500).send('Erro ao buscar conta: ' + error);

    });
}

// checkBalance
function checkBalance(req, res) {

  var accountNumber = req.params.accountNumber;

  accountModel.checkBalance(accountNumber)
    .then((result) => {

      if (result.length > 0) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Conta não encontrada!');
      }

    })
    .catch((error) => {

      res.status(500).send('Erro ao buscar conta: ' + error);

    });
}

function createAccount(req, res) {
  
    var user = req.body;
  
    accountModel.createAccount(user)
      .then((result) => {
  
        res.status(201).send('Conta criada com sucesso!');
  
      })
      .catch((error) => {
  
        res.status(500).send('Erro ao criar conta: ' + error);
  
      });
  }

  function updateBalance(req, res) {
  
    var accountNumber = req.params.accountNumber;
    var value = req.body.value;
  
    accountModel.updateBalance(accountNumber, value)
      .then((result) => {
  
        res.status(200).send('Saldo atualizado com sucesso!');
  
      })
      .catch((error) => {
  
        res.status(500).send('Erro ao atualizar saldo: ' + error);
  
      });
  }

module.exports = {
  findByAccountNumber,
  findAllByUserEmail,
  checkBalance,
  createAccount,
  updateBalance
};