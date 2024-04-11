import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Gallery.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import App from './App';

function Navbar() {
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
        </ul>
      </nav>
    );
  }


function CrewmateCard({ crewmate }) {
    return (
      <div className="card">
        <div className="card-image">
          <img src="https://shimmering-stardust-c75334.netlify.app/assets/crewmate.ce385016.png" alt="Image" width={200}/>
        </div>
        <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<App />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
        <div className="card-content">
          <h3>Name of Crewmate: {crewmate.name}</h3>
          <p>Speed of Crewmate: {crewmate.speed} mph</p>
          <p>Color of Crewmate: {crewmate.color}</p>
          <button className="edit-button">Edit Crewmate</button>
        </div>
      </div>
    );
  }

  CrewmateCard.propTypes = {
    crewmate: PropTypes.object.isRequired,
  };

function Gallery() {
    const supabaseUrl = 'https://miutyhwlstoqhnrqjnog.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pdXR5aHdsc3RvcWhucnFqbm9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NDA2NzAsImV4cCI6MjAyODExNjY3MH0.HIn0JJZy4y12n000xZAJiu6nw235WfbsqXbJOUEuCV4'
    const supabase = createClient(supabaseUrl, supabaseKey)
      const [crewmates, setCrewmates] = useState([]);

    useEffect(() => {
        async function fetchCrewmates() {
          const { data, error } = await supabase.from('crewmates').select('*');
          if (error) {
            console.log('error', error);
            return;
          }else {
            setCrewmates(data);
          }
        }
        fetchCrewmates();
    }, []);


    return (
        <div className="gallery-container">
      {crewmates.map((crewmate) => (
        <CrewmateCard key={crewmate.id} crewmate={crewmate} />
      ))}
    </div>
  );
}

export default Gallery;