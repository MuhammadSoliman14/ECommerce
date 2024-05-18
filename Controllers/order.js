const Order = require('../models/Order');

const putOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json('Order is deleted');
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const postOrder = async (req, res) => {
    try {
        const savedOrder = await Order.create(req.body); // Assuming req.body contains order data
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    putOrder,
    deleteOrder,
    postOrder,
    getOrder,
    getAllOrders,
};
