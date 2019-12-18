const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order: [
        {
            eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
            quantity: {type: Number, required: true},
            subTotal: {type: Number, required: false}
        }
    ],
    totalPrice: {type: Number, required: false}
});

module.exports = mongoose.model('Order', orderSchema);