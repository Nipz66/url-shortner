import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Header from './components/Head/Header';
import QrcodeGenerate from './components/QrcodeGenerate';
import Home from './components/Home/Home';
import Linkshortner from './components/LinkShortner/Linkshortner';
import ShortnerLink from './components/LinkShortner/ShortnerLink';


function App() {

  return (

    <Router>

      <Header />

      <Routes>

        <Route path="/Home" element={<Home />} />
        <Route path="/shorten-link" element={<ShortnerLink />} />
        <Route path="/qr-code" element={<QrcodeGenerate />} />

      </Routes>
    </Router>
  );
}


export default App
