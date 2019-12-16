const mongoose = require('mongoose');

const seminarSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    date: { type: String, required: true },
    place: { type: String, required: true },
    abstract: { type: String, required: true },
    photoGallery: { type: String, required: false }
});

module.exports = mongoose.model('Seminar', seminarSchema);