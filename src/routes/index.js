const express = require('express');
const roomRouter = require('./room.route');
const chatRouter = require('./chat.route');

const mainRouter = express.Router();
mainRouter.use('/room', roomRouter);
mainRouter.use('/chat', chatRouter);

module.exports = mainRouter;
