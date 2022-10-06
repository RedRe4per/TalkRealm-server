const express = require('express');
const { 
    getAllOrders,
    createOrder,
    deleteAllOrders,
} = require('../controllers/order.controller');

const orderRouter = express.Router();
orderRouter.get('', getAllOrders);
orderRouter.post('', createOrder);
orderRouter.delete('', deleteAllOrders);

module.exports = orderRouter;