const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    birth: { type: String, required: true },
    abstarct: { type: String, required: true },
    achivments: { type: String, required: true },
    artistImage: { type: String, required: true }
});

module.exports = mongoose.model('Artist', artistSchema);