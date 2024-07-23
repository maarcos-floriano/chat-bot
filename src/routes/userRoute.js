var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.post('/login', (req, res) =>{
  userController.login(req, res);
});

router.get('/detailByEmail/:email', (req, res) =>{
  userController.detailByEmail(req, res);
});

router.get('/detailById/:id', (req, res) =>{
  userController.detailById(req, res);
});

router.get('/detailByPhone/:phone', (req, res) =>{
  userController.detailByPhone(req, res);
});

module.exports = router;