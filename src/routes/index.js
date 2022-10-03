const express = require('express');
const paymentRouter = require('./payment.route');
const cartItemRouter = require('./cartItem.route')

const mainRouter = express.Router();
mainRouter.use('/payment', paymentRouter);
mainRouter.use('/cartItem', cartItemRouter);

module.exports = mainRouter;
