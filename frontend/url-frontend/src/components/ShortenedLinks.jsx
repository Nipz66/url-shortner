import React from 'react'

const ShortenedLinks = ({ shortenedUrls }) => {
    return (
        <div className='bg-white p-6 rounded-lg shadow-lg mt-4'>
            <h2 className='text-xl font-bold mb-4'>Shortened Links</h2>
            <ul>
                {shortenedUrls.map((url, index) => (
                    <li key={index} className='mb-2'>
                        <a href={`${process.env.REACT_APP_API_URL}/${url}`} target='_blank' rel="noopener noreferrer" className="text-blue-500">
                            {`${window.location.origin}/${url}`}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShortenedLinks