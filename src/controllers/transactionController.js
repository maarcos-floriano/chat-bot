var transactionModel = require("../models/transactionModel");

function findByAccountNumber(req, res) {

  var accountNumber = req.params.accountNumber;

  transactionModel.findByAccountNumber(accountNumber)
    .then(function (result) {

      res.status(200).json(result);

    })
    .catch(function (error) {

      res.status(500).json({ message: "Erro ao buscar transações: " + error });

    });

}

function findByUserEmail(req, res) {

  var email = req.params.email;

  transactionModel.findByUserEmail(email)
    .then(function (result) {

      res.status(200).json(result);

    })
    .catch(function (error) {

      res.status(500).json({ message: "Erro ao buscar transações: " + error });

    });

}

function findByType(req, res) {

  var type = req.params.type;

  transactionModel.findByType(type)
    .then(function (result) {

      res.status(200).json(result);

    })
    .catch(function (error) {

      res.status(500).json({ message: "Erro ao buscar transações: " + error });

    });
  
}

module.exports = {
  findByAccountNumber,
  findByUserEmail,
  findByType
};