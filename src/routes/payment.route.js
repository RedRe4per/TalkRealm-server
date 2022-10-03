const express = require('express');
const { createCheckoutSession
} = require('../controllers/payment.controller');

const paymentRouter = express.Router();
paymentRouter.post('/create-checkout-session', createCheckoutSession);

module.exports = paymentRouter;