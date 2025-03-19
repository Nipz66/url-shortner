import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Header from './components/Head/Header';
import QrcodeGenerate from './components/QrcodeGenerate';
import Home from './components/Home/Home';
import Linkshortner from './components/LinkShortner/Linkshortner';
import ShortnerLink from './components/LinkShortner/ShortnerLink';
import About from './components/About/About';
import Dashboard from './components/Dashboard/Dashboard.JSX';
import Login from './components/Login/Login';


function App() {

  return (

    <Router>

      <Header />

      <Routes>

        <Route path="/Home" element={<Home />} />
        <Route path="/shorten-link" element={<ShortnerLink />} />
        <Route path="/qr-code" element={<QrcodeGenerate />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about-Us" element={<About />} />
        <Route path='/login' element={<Login />} />

      </Routes>
    </Router>
  );
}


export default App
