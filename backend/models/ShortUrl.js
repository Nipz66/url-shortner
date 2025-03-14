const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, unique: true, required: true },
    qrCode: { type: String, required: true }, // Stores QR code data
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
