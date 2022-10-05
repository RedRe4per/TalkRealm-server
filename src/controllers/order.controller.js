const Order = require('../models/order');

async function getAllOrders(req, res) {
    const orders = await Order.find().sort({createdAt: -1}).exec();
    return res.json(orders);
}

async function createOrder(req, res) {
    const order = new Order(req.body);
    await order.save();
    return res.send(order);
}


module.exports = {
    getAllOrders,
    createOrder,
}