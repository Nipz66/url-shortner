const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true }, // Original long URL
    shortUrl: { type: String, unique: true },      // Generated short URL
    createdAt: { type: Date, default: Date.now }  // Timestamp
});

module.exports = mongoose.model('Url', urlSchema);
