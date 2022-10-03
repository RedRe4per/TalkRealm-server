const CartItem = require('../models/cartItem');
const Joi = require('joi');

async function getAllCartItems(req, res) {
    const cartItems = await CartItem.find().exec();
    return res.json(cartItems);
}

async function createCartItems(req, res) {
    const cartItem = new CartItem(req.body);
    await cartItem.save();
    return res.send(cartItem)
}




module.exports = {
    getAllCartItems,
    createCartItems,
}