var chatModel = require('../models/chatModel');

function findOpenChats(req, res) {
  var email = req.params.email;
  chatModel.findOpenChats(email).then(function (result) {
    res.json(result);
  })["catch"](function (error) {
    res.status(500).json({
      message: error.message
    });
  });
}

function findByStatus(req, res) {
  var status = req.params.status;
  chatModel.findByStatus(status).then(function (result) {
    res.json(result);
  })["catch"](function (error) {
    res.status(500).json({
      message: error.message
    });
  });
}

function findMessages(req, res) {
  var chatId = req.params.chatId;
  chatModel.findMessages(chatId).then(function (result) {
    res.json(result);
  })["catch"](function (error) {
    res.status(500).json({
      message: error.message
    });
  });
}

function createChat(req, res) {
  var email = req.body.email;
  chatModel.createChat(email).then(function (result) {
    res.json({
      message: 'Chat criado com sucesso'
    });
  })["catch"](function (error) {
    res.status(500).json({
      message: error.message
    });
  });
}

function createMessage(req, res) {
  var chatId = req.body.chatId;
  var message = req.body.message;
  chatModel.createMessage(chatId, message).then(function (result) {
    res.json({
      message: 'Mensagem criada com sucesso'
    });
  })["catch"](function (error) {
    res.status(500).json({
      message: error.message
    });
  });
}

function closeChat(req, res) {
  var chatId = req.body.chatId;
  chatModel.closeChat(chatId).then(function (result) {
    res.json({
      message: 'Chat fechado com sucesso'
    });
  })["catch"](function (error) {
    res.status(500).json({
      message: error.message
    });
  });
}

function updateMessage(req, res) {
  var messageId = req.body.messageId;
  var message = req.body.message;
  chatModel.updateMessage(messageId, message).then(function (result) {
    res.json({
      message: 'Mensagem atualizada com sucesso'
    });
  })["catch"](function (error) {
    res.status(500).json({
      message: error.message
    });
  });
}

module.exports = {
  findOpenChats,
  findByStatus,
  findMessages,
  createChat,
  createMessage,
  closeChat,
  updateMessage
}