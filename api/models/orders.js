const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'SingleOrder', required: true },
    totalPrice: {type: Number, required: false}
});

module.exports = mongoose.model('Order', orderSchema);