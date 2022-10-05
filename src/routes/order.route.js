const express = require('express');
const { 
    getAllOrders,
    createOrder,
} = require('../controllers/order.controller');

const orderRouter = express.Router();
orderRouter.get('', getAllOrders);
orderRouter.post('', createOrder);

module.exports = orderRouter;