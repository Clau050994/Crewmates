import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Gallery.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CrewmateCard({ crewmate }) {
    return (
      <div className="card">
        <div className="card-image">
          <img src="https://i.redd.it/n2qf8uzibls51.png" alt="Image" width={200}/>
        </div>
        <div className="card-content">
          <h3>Name of Crewmate: {crewmate.name}</h3>
          <p>Speed of Crewmate: {crewmate.speed} mph</p>
          <p>Color of Crewmate: {crewmate.color}</p>
          <Link
            to="/Crewmate"
            state={{ name: crewmate.name, speed: crewmate.speed, color: crewmate.color, id: crewmate.id }}
            className="edit-button"
        >
          Edit Crewmate
          </Link>

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
          const { data, error } = await supabase.from('User').select('*');
          console.log(data);
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