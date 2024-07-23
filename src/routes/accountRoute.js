var express = require('express');
var router = express.Router();

var accountController = require('../controllers/accountController');

router.get('/findByAccountNumber/:accountNumber', (req, res) =>{
  accountController.findByAccountNumber(req, res);
});

router.get('/findAllByUserEmail/:email', (req, res) =>{
  accountController.findAllByUserEmail(req, res);
});

router.get('/checkBalance/:accountNumber', (req, res) =>{
  accountController.checkBalance(req, res);
});

module.exports = router;