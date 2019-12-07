const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    essentialData:{
        name: { type: String, required: true },
        currentAffiliattion: { type: Number, required: true },
        achivements: { type: String, required: true },
        isCompany: { type: Boolean, default: false },
        companyMembers: { type: [], required: false }
    },
    abstract: { type: String, required: true },
    photoGallery: { type: [], required: true }
});

module.exports = mongoose.model('Artist', artistSchema);