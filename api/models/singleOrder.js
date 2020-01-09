const mongoose = require('mongoose');

const SingleOrderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    subTotal: {type: Number, required: false}

});

module.exports = mongoose.model('SingleOrder', SingleOrderSchema);