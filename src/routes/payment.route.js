const express = require('express');
const { 
    createCheckoutSession,
    getSessionInfoById,
} = require('../controllers/payment.controller');

const paymentRouter = express.Router();
paymentRouter.get('/:id', getSessionInfoById);
paymentRouter.post('/create-checkout-session', createCheckoutSession);

module.exports = paymentRouter;