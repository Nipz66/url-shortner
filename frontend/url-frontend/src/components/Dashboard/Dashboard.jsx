import React, { useState } from 'react';

const Dashboard = () => {

    //Dashboard part is create but it is not good and this same not import I think first add link-short and qr option only and second we can add dashboard
    // State for link input and shortened link
    const [link, setLink] = useState('');
    const [shortenedLink, setShortenedLink] = useState('');
    const [error, setError] = useState('');

    // Function to handle link shortening (this is just a mock function)
    const handleShortenLink = () => {
        if (link) {
            // Normally, you would call an API to shorten the link.
            // For demo purposes, we're just adding a random suffix.
            const shortened = `https://short.ly/${Math.random().toString(36).substring(2, 8)}`;
            setShortenedLink(shortened);
            setError('');
        } else {
            setError('Please enter a valid URL.');
        }
    };

    // Copy to clipboard function
    const handleCopy = () => {
        if (shortenedLink) {
            navigator.clipboard.writeText(shortenedLink).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    };

    return (
        <div className="flex flex-col w-full h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="flex-none bg-indigo-600 text-white w-64 p-4">
                <h2 className="text-2xl font-semibold">Dashboard</h2>
                <nav className="mt-4">
                    <ul>
                        <li className="mb-4">
                            <a href="#" className="hover:text-indigo-200">Home</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:text-indigo-200">Statistics</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:text-indigo-200">Settings</a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Dashboard Content */}
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Link Shortening Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Shorten Your Link</h3>

                        {/* Link Input */}
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Paste your link here"
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        />

                        {/* Error message */}
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        {/* Shorten Button */}
                        <button
                            onClick={handleShortenLink}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                        >
                            Shorten Link
                        </button>

                        {/* Display Shortened Link */}
                        {shortenedLink && (
                            <div className="mt-4">
                                <p className="font-semibold text-gray-700">Shortened Link:</p>
                                <input
                                    type="text"
                                    value={shortenedLink}
                                    readOnly
                                    className="w-full p-2 border border-gray-300 rounded-md mt-2"
                                />
                                <button
                                    onClick={handleCopy}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md mt-2"
                                >
                                    Copy to Clipboard
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Statistics Cards */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Daily Users</h3>
                        <p className="text-3xl font-bold text-indigo-600">12,450</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
