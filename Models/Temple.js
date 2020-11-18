const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
    title: String,
    description: String,
    pictures: Array
}, {
    timestamps: true
});

const Temple = mongoose.model('Temple', templeSchema);

module.exports = Temple;