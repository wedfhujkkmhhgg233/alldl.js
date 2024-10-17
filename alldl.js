const express = require('express');
const { alldown } = require('nayan-media-downloader');

const app = express();
const PORT = process.env.PORT || 3000;

// Route to handle media download requests
app.get('/download', async (req, res) => {
    const url = req.query.url; // Get the URL from query parameters

    if (!url) {
        return res.status(400).json({ error: 'URL is required.' });
    }

    try {
        const data = await alldown(url);
        res.json(data); // Return the downloaded media data
    } catch (error) {
        console.error('Error downloading media:', error);
        res.status(500).json({ error: 'Failed to download media.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
