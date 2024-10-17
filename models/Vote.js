const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    guidelineId: String,
    voterId: String,
    vote: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vote', VoteSchema);
