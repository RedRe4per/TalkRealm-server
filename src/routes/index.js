const express = require('express');
const paymentRouter = require('./payment.route');
const cartItemRouter = require('./cartItem.route')
const webhookRouter = require('./webhook.route');
const orderRouter = require('./order.route');

const mainRouter = express.Router();
mainRouter.use('/payment', paymentRouter);
mainRouter.use('/cartItem', cartItemRouter);
mainRouter.use('/webhook', webhookRouter);
mainRouter.use('/order', orderRouter);

module.exports = mainRouter;
