import { useState } from 'react';
import './Profile.css'
import { createClient } from "@supabase/supabase-js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');
  const supabaseUrl = 'https://miutyhwlstoqhnrqjnog.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pdXR5aHdsc3RvcWhucnFqbm9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NDA2NzAsImV4cCI6MjAyODExNjY3MH0.HIn0JJZy4y12n000xZAJiu6nw235WfbsqXbJOUEuCV4'
  const supabase = createClient(supabaseUrl, supabaseKey)
  

  const notify = (message) => toast(message);


  const handleSubmit =  async(e) => {
    e.preventDefault();
    const { data, error } = await supabase
    .from('User')
    .insert([
        { name: name, speed: speed, color: color }
    ]);
    
    if ( error ) {
      console.log("There was an error inserting the data", error);
      notify("There was an error inserting the data");
    }else{
      console.log("Inserting data",data);
      notify("Congratulations on creating a new crewmate!");
    }
  };
  return (
    <div className="container">
      <h1>Create a New Crewmate</h1>
      <div>
          <img src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png" alt="Image" width={500} />
      </div>
      <div>
        <ToastContainer />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter crewmate's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="speed">Speed (mph):</label>
          <input
            id="speed"
            type="text"
            placeholder="Enter speed in mph"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Color:</label>
          <div className="radio-group">
            {['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Orange', 'Pink', 'Rainbow'].map((colorOption) => (
              <label key={colorOption}>
                <input
                  type="radio"
                  value={colorOption}
                  checked={color === colorOption}
                  onChange={(e) => setColor(e.target.value)}
                />
                {colorOption}
              </label>
            ))}
          </div>
        </div>
        <button type="submit">Create Crewmate</button>
      </form>
    </div>
  );
}

export default Profile;
