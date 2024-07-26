var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.post('/login', (req, res) =>{
  userController.login(req, res);
});

router.get('/detailByEmail/:email', (req, res) =>{
  userController.detailByEmail(req, res);
});

router.get('/detailByCpf/:cpf', (req, res) =>{
  userController.detailByCPF(req, res);
});

router.get('/detailById/:id', (req, res) =>{
  userController.detailById(req, res);
});

router.get('/detailByPhone/:phone', (req, res) =>{
  userController.detailByPhone(req, res);
});

router.post('/create', (req, res) =>{
  userController.create(req, res);
});


router.put('/update', (req, res) =>{
  userController.update(req, res);
});

router.delete('/remove/:id', (req, res) =>{
  userController.remove(req, res);
});

module.exports = router;