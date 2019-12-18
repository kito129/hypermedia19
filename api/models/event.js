const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
    name: { type: String, required: true },
    date: { type: String, required: true },
    place: { type: String, required: true },
    price: { type: Number, required: true },
    isSoldOut: { type: String, required: true },
    type: { type: String, required: true },
    relSeminar: { type: mongoose.Schema.Types.ObjectId, ref: 'Seminar', required: false },
    abstract: { type: String, required: true },
    photoGallery: { type: String, required: false }    
});

module.exports = mongoose.model('Event', eventSchema);