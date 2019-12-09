const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    currentAffiliattion: { type: String, required: true },
    achivements: { type: [], required: true },
    isCompany: { type: Boolean, default: false },
    companyMembers: { type: [], required: false },
    abstract: { type: String, required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    photoGallery: { type: [], required: true }
});

module.exports = mongoose.model('Artist', artistSchema);