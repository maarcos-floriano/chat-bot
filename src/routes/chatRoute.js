var express = require('express');
var router = express.Router();

var chatController = require('../controllers/chatController');

router.get('/findOpenChats/:email', (req, res) => {
  chatController.findOpenChats(req, res);
});

router.get('/findByStatus/:status', (req, res) => {
  chatController.findByStatus(req, res);
});

router.get('/findMessages/:chatId', (req, res) => {
  chatController.findMessages(req, res);
});

router.post('/createChat', (req, res) => {
  chatController.createChat(req, res);
});

router.post('/createMessage', (req, res) => {
  chatController.createMessage(req, res);
});

router.put('/closeChat/:chatId', (req, res) => {
  chatController.closeChat(req, res);
});

router.put('/updateMessage/:messageId', (req, res) => {
  chatController.updateMessage(req, res);
});

module.exports = router;
