const { tokenAuthorization, tokenAuthorizationOnlyAdmin } = require('../controllers/verifyToken');
const Cart = require('../models/Cart');

const putCart = async (req, res) => {
    try {
        const updatedProduct = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(201).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('Cart is deleted');
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const postCart = async (req, res) => {
    try {
        const savedCart = await Cart.create(req.body);
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    putCart,
    deleteCart,
    postCart,
    getCart,
    getAllCarts,
};
