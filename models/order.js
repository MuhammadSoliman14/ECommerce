const mongoose=require('monogoose');

const orderSchema = new mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"OrderItem",
        required:true
    }],
    shippingAddress1: {
        type: String,
        required: true,
    },
    shippingAddress2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed','cancelled']
    }, 
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid', 'refunded'], 
        default: 'unpaid'
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'valu', 'fawry'],
        required: true
    },
    transactionId: {
        type: String
    }
})

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

exports.Order= mongoose.model('Order',orderSchema);