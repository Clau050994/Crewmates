import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Profile.jsx';
import Gallery from './Gallery.jsx';
import Navbar from './NavBar.jsx';
import Crewmate from './Crewmate.jsx';
// import crew




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Crewmate" element={<Crewmate />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
