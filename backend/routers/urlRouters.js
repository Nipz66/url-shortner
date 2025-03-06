const express = require('express');
const router = express.Router();
const Url = require('./models/Url');
const { nanoid } = require('nanoid');

//  Shorten URL Endpoint
router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = nanoid(6); // Generates a 6-character unique ID

    try {
        const newUrl = new Url({ originalUrl, shortUrl });
        await newUrl.save(); // Save to MongoDB
        res.json({ shortUrl });
    } catch (err) {
        res.status(500).json({ error: 'Error shortening URL' });
    }
});

//  Redirect Short URL to Original URL
router.get('/:shortUrl', async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl });
        if (url) {
            res.redirect(url.originalUrl);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
