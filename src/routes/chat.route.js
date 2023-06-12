const express = require('express');
const { 
    listAll,
    getById,
    create,
    update,
    deleteById,
} = require('../controllers/chat.controller');

const chatRouter = express.Router();
chatRouter.get('', listAll);
chatRouter.get('/:id', getById);
chatRouter.post('', create);
chatRouter.put('/:id', update);
chatRouter.delete('/:id', deleteById);

module.exports = chatRouter;