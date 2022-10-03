const express = require('express');
const { 
    getAllCartItems, 
    createCartItems
} = require('../controllers/cartItem.controller');

const cartItemRouter = express.Router();
cartItemRouter.get('', getAllCartItems);
cartItemRouter.post('', createCartItems);

module.exports = cartItemRouter;