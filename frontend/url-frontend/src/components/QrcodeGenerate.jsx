import React, { useState } from 'react'

const QrcodeGenerate = () => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");

    const handleShortenUrl = async () => {
        if (!originalUrl) {
            setError("Please Enter Url !");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/shorten", { originalUrl, });

            setShortUrl(respons.data.shortUrl);
            setError("");
        } catch (err) {
            setError("Failed to shorten the URL. Please try again.")
        }

    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-4">QR Code & URL Shortener</h1>
            <input
                type="text"
                placeholder="Enter your URL"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="border rounded-md p-2 w-full max-w-md mb-4"
            />
            <button
                onClick={handleShortenUrl}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Shorten URL & Generate QR
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {shortUrl && (
                <div className="mt-6 text-center">
                    <p className="text-lg">Shortened URL:</p>
                    <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        {shortUrl}
                    </a>

                    <div className="mt-4">
                        <p className="text-lg">QR Code:</p>
                        <QRCode value={shortUrl} size={200} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default QrcodeGenerate