const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    factSheet:{
        artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
        date: { type: String, required: true },
        place: { type: String, required: true },
        relSeminar: { type: mongoose.Schema.Types.ObjectId, ref: 'Seminar', required: true },
    },
    abstract: { type: String, required: true },
    photoGallery: { type: [], required: true }
    
});

module.exports = mongoose.model('Event', eventSchema);