const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    date: { type: String, required: true },
    place: { type: String, required: true },
    details: { type: String, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    relSeminars: { type: mongoose.Schema.Types.ObjectId, ref: 'Seminar', required: true },
    eventImages:{ type: String, required: true },
    soldOut: { type: Boolean, required: true },
    price: { type: Boolean, required: true },
});

module.exports = mongoose.model('Event', eventSchema);