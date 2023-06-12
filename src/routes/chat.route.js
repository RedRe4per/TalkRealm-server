const express = require('express');
const {
  getById,
  create,
  update,
  deleteById,
} = require('../controllers/chat.controller');

const chatRouter = express.Router();
chatRouter.get('/:id', getById);
chatRouter.post('', create);
chatRouter.put('/:id', update);
chatRouter.delete('/:id', deleteById);

module.exports = chatRouter;
