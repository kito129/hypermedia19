const mongoose = require('mongoose');

const singleOrderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    quantity: {type: Number, required: true},
    subTotal: {type: Number, required: false}

});

module.exports = mongoose.model('singleOrder', singleOrderSchema);