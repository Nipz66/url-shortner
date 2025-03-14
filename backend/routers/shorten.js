const express = require("express");
const QRCode = require("qrcode");
const ShortUrl = require("../models/ShortUrl");
const router = express.Router();

// Generate Short URL & QR Code
router.post("/shorten", async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortUrl = Math.random().toString(36).substr(2, 6); // Generate short code
    const fullShortUrl = `http://localhost:5000/${shortUrl}`; // Replace with your domain

    // Generate QR Code
    const qrCode = await QRCode.toDataURL(fullShortUrl);

    // Save to MongoDB
    const newShortUrl = new ShortUrl({ originalUrl, shortUrl: fullShortUrl, qrCode });
    await newShortUrl.save();

    res.json({ shortUrl: fullShortUrl, qrCode });
});

module.exports = router;
