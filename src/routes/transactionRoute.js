var express = require('express');
var router = express.Router();

var transactionController = require('../controllers/transactionController');

router.get('/findByAccountNumber/:accountNumber', (req, res) => {
  transactionController.findByAccountNumber(req, res);
});

router.get('/findByUserEmail/:email', (req, res) => {
  transactionController.findByUserEmail(req, res);
});

router.get('/findByType/:type', (req, res) => {
  transactionController.findByType(req, res);
});

module.exports = router;