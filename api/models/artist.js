const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    currentAffiliattion: { type: String, required: true },
    achivements: { type: Array, required: true},
    isCompany: { type: Boolean, default: false },
    companyMembers: { type: Array, required: true },
    abstract: { type: String, required: true },
    type:{ type: String, required: true },
    photoGallery: { type: Array, required: false }
});

module.exports = mongoose.model('Artist', artistSchema);