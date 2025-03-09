import React, { useState } from 'react'
import axios from "axios";

const ShortenerForm = ({ addshortenedurl }) => {
    const [originalUrl, setOriginalUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!originalUrl) {
            TransformStream.error("Please Enter a Url");
            return;
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/shorten`, { originalUrl });
            addshortenedurl(res.data.shortUrl);
            setOriginalUrl("");
            toast.success("URL shortened suceefully !");
        } catch (error) {
            toast.error("Failed to shortened URL");
        }
    };

    return (
        <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className="text-xl font-bold mb-4">Shorten Your URL</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    className='border p-2 w-full rounded-lg'
                    placeholder='Enter Url'
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)} />

                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 w-full'>Shorten URL</button>

            </form>
        </div>
    )
}

export default ShortenerForm