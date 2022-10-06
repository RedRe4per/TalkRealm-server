const Order = require('../models/order');

async function getAllOrders(req, res) {
    const orders = await Order.find().sort({createdAt: -1}).exec();
    return res.json(orders);
}

async function createOrder(req, res) {
    const order = new Order(req.body);
    order.createdAt = new Date();
    order.updatedAt = new Date();
    await order.save();
    return res.send(order);
}

async function deleteAllOrders(req, res) {
    const results = await Order.deleteMany();
    return res.send(results);
}


module.exports = {
    getAllOrders,
    createOrder,
    deleteAllOrders
}