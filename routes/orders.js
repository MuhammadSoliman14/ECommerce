const {Order} = require('../models/order');
const express = require('express');
const { OrderItem } = require('../models/order-item');
const stripe = require('stripe')('sk_test_51PEa1ARopHXcqZa5AOyewsaOQqv3R8ATRlY96FY2hoVp0pmRhnGqLcJxOHnr0Yxv43wTbs7323IigOAnyxpUr6Ke00VqMZjZQF');
const router = express.Router();

/*Get list of Orders and populate user data for each order*/
router.get(`/`, async (req, res) =>{
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});

    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.send(orderList);
})

/*Get a specific order from the database by its ID, populate user data and details of order items*/
router.get(`/:id`, async (req, res) =>{
    const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        });

    if(!order) {
        res.status(500).json({success: false})
    } 
    res.send(order);
})

/* Create new orders and provide feedback on the success or failure*/
router.post('/', async (req,res)=>{
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved =  await orderItemsIds;
    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice
    }))
    const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    })
    order = await order.save();

    if(!order)
    return res.status(400).send('The order cannot be created!')
    res.send(order);
})

/*Update the status of a specific order and returns the updated order*/
router.put('/:id/status', async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    );
    if (!order) return res.status(400).send('Order not found.');
    res.send(order);
})

/*Delete both the order and its associated order items from the database*/
router.delete('/:id', (req, res)=>{
    Order.findByIdAndRemove(req.params.id).then(async order =>{
        if(order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({success: true, message: 'The order is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "Order not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

/*Calculate the total sales amount from the totalPrice field of all orders in the database*/
router.get('/get/totalsales', async (req, res)=> {
    const totalSales= await Order.aggregate([
        { $group: { _id: null , totalsales : { $sum : '$totalPrice'}}}
    ])

    if(!totalSales) {
        return res.status(400).send('The order sales cannot be generated')
    }

    res.send({totalsales: totalSales.pop().totalsales})
})

/*Get the total count of orders in the database*/ 
router.get(`/get/count`, async (req, res) =>{
    const orderCount = await Order.countDocuments((count) => count)

    if(!orderCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        orderCount: orderCount
    });
})

/*Get all orders associated with a specific user from the database, populate order items with product and category details, and sends the list of user orders*/
router.get(`/get/userorders/:userid`, async (req, res) =>{
    const userOrderList = await Order.find({user: req.params.userid}).populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        }).sort({'dateOrdered': -1});

    if(!userOrderList) {
        res.status(500).json({success: false})
    } 
    res.send(userOrderList);
})

/*Update the status of a specific order to 'cancelled' and return the updated order*/
router.put('/:id/cancel', async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: 'cancelled' },
        { new: true }
    );
    if (!order) return res.status(404).send('Order not found or already cancelled.');
    res.send(order);
})

/*Confirm the payment for a specific order, update its status and payment details accordingly, and return the updated order */
router.put('/:id/confirm', async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: 'processing', paymentStatus: 'paid', transactionId: req.body.transactionId },
        { new: true }
    );
    if (!order) return res.status(404).send('Order not found.');
    res.send(order);
})

/*  a Charge using Stripe for a specific order */
router.post('/:id/charge', async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        // Check if the order exists
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found.' });
        }

        // Check if the order is already paid
        if (order.paymentStatus === 'paid') {
            return res.status(400).json({ success: false, message: 'Order is already paid.' });
        }

        // Create a charge using Stripe API
        const charge = await stripe.charges.create({
            amount: order.totalPrice * 100, 
            currency: 'usd',
            source: req.body.stripeToken, 
            description: `Payment for Order ${orderId}`
        });

        // Update order status and payment details
        order.status = 'processing';
        order.paymentStatus = 'paid';
        order.transactionId = charge.id;
        await order.save();

        // Return the updated order
        res.json({ success: true, message: 'Payment successful.', order: order });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ success: false, message: 'Error processing payment.', error: error });
    }
});

module.exports = router;