const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order: [
        {
            eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
            number: {type: Number, required: true},
            subTotal: {type: Number, required: true}
        }
    ],
    totalPrice: {type: Number, required: true}
});

module.exports = mongoose.model('Order', orderSchema);