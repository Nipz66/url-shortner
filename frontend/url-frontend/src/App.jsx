import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

      <Header />

      <Routes>

        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/shorten" element={<URLShortener />} /> */}
        <Route path="/qr-code" element={<QrcodeGenerate />} />

      </Routes>
    </Router>
  );
}


export default App
