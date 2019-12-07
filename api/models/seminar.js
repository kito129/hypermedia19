const mongoose = require('mongoose');

const seminarSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    factSheet:{
        relEvent: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
        date: { type: String, required: true },
        place: { type: String, required: true },
    }    
});

module.exports = mongoose.model('Seminar', seminarSchema);