const express = require('express');
const router = express.Router();
const { Order } = require('../models/order');
const { OrderItem } = require('../models/order-item');
const stripe = require('stripe')('your_stripe_secret_key');

// Place a new order
router.post('/place-order', async (req, res) => {
    try {
        // Extract order details from request body
        const { orderItems, shippingAddress, totalPrice, paymentMethod, userId } = req.body;

        // Create order items
        const createdOrderItems = await OrderItem.insertMany(orderItems);

        // Calculate total price (optional, if not provided in request body)
        // const totalPrice = orderItems.reduce((total, item) => total + (item.quantity * item.price), 0);

        // Create the order
        const newOrder = new Order({
            orderItems: createdOrderItems.map(item => item._id),
            shippingAddress,
            totalPrice,
            paymentMethod,
            user: userId
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Process an order payment
router.post('/process-payment/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { paymentToken } = req.body;

        // Retrieve order details
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Process payment using Stripe
        const charge = await stripe.charges.create({
            amount: order.totalPrice * 100, // Convert to cents
            currency: 'usd',
            source: paymentToken,
            description: `Payment for order ${orderId}`
        });

        // Update order status and payment details
        order.status = 'processing';
        order.paymentStatus = 'paid';
        order.transactionId = charge.id;
        await order.save();

        res.json({ message: 'Payment successful', order });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
