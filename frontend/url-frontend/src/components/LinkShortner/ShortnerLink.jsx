import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ShortnerLink = () => {
    const [originalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    const handleShorten = async () => {
        if (!originalUrl) return toast.error("Please enter a URL");

        //Linkshortner

        try {
            const { data } = await axios.post("http://localhost:5000/api/shorten", { originalUrl });
            setShortUrl(data.shortUrl);
            toast.success("URL Shortened Successfully!");
        } catch (error) {
            toast.error("Error shortening URL");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold mb-4">Shorten Your URL</h2>
            <input
                type="text"
                className="border rounded-md p-2 w-full max-w-md mb-4"
                placeholder="Enter URL"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleShorten}>
                Shorten
            </button>
            {shortUrl && (
                <div className="mt-4">
                    <p>Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
                </div>
            )}
        </div>
    );
};

export default ShortnerLink;
