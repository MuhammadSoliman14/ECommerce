const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Corrected typo in reference model name
    }
});

// Export the OrderItem model
module.exports = mongoose.model('OrderItem', orderItemSchema);
