import { useState } from 'react'
import './App.css'
import ShortenerForm from './components/ShortenerForm'
import ShortenedLinks from './components/ShortenedLinks';

function App() {
  const [ShortenedUrls, setShortenedUrls] = useState([]);

  const addshortenedurl = (shortUrl) => {
    setShortenedUrls([...ShortenedUrls, shortUrl]);
  };
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-1/3'>
        <ShortenerForm addshortenedurl={addshortenedurl} />
        <ShortenedLinks shortenedUrls={ShortenedUrls} />
        <ToastContainer position="top-right" autoClose={3000} />

      </div>
    </div>
  );
}


export default App
