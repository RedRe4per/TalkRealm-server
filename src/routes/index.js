const express = require('express');
const roomRouter = require('./room.route');

const mainRouter = express.Router();
mainRouter.use('/room', roomRouter);

module.exports = mainRouter;
