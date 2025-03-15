import { useState } from 'react'
import './App.css'
import ShortenerForm from './components/ShortenerForm'
import ShortenedLinks from './components/ShortenedLinks';
import Header from './components/Head/Header';
import Discription from './components/Body/Description'
import QrcodeGenerate from './components/QrcodeGenerate';
import Home from './components/Home/Home';

function App() {
  const [ShortenedUrls, setShortenedUrls] = useState([]);

  const addshortenedurl = (shortUrl) => {
    setShortenedUrls([...ShortenedUrls, shortUrl]);
  };
  return (

    <Router>
      <div>
        <Header />
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
          <div className='w-1/3'>
            <ShortenerForm addshortenedurl={addshortenedurl} />
            <ShortenedLinks shortenedUrls={ShortenedUrls} />
            {/* <ToastContainer position="top-right" autoClose={3000} /> */}

          </div>
        </div>
        <Discription />
        {/* <QrcodeGenerate /> */}


      </div>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/shorten" element={<URLShortener />} />
        <Route path="/qr-code" element={<QrcodeGenerate />} />
      </Routes>

    </Router>
  );
}


export default App
