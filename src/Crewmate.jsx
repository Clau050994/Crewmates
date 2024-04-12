import { useState } from "react";
import "./Profile.css";
import { createClient } from "@supabase/supabase-js";
import "react-toastify/dist/ReactToastify.css";
import "./Crewmate.css";
import { useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Crewmate() {
  const location = useLocation();
  const crewmate = location.state;
  const [name, setName] = useState(crewmate?.name);
  const [speed, setSpeed] = useState(crewmate?.speed);
  const [color, setColor] = useState(crewmate?.color);
  const id = crewmate?.id;
  const supabaseUrl = "https://miutyhwlstoqhnrqjnog.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pdXR5aHdsc3RvcWhucnFqbm9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NDA2NzAsImV4cCI6MjAyODExNjY3MH0.HIn0JJZy4y12n000xZAJiu6nw235WfbsqXbJOUEuCV4";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const notify = (message) => toast(message);

  async function handleSubmit(event) {
    await handleUpdate(event);
    return;
  }

  async function handleUpdate (event) {
    event.preventDefault();
    try {
        const { data, error } = await supabase
          .from("User")
          .update({ name, speed, color })
          .eq('id', id);
  
        if (error) {
          throw error;
        }
  
        console.log("Successfully updated crewmate with ID 1", data);
        notify("Congratulations on updating your crewmate!");
      } catch (error) {
        console.error("Error updating crewmate:", error);
      }
  }

  async function handleDelete(event) {
    console.log('here')
    event.preventDefault();
    try {
      const { data, error } = await supabase.from("User").delete().eq("id", id);
      if (error) {
        throw error;
      }

      console.log("Successfully deleted crewmate with ID 1", data);
      notify("Congratulations on deleting your crewmate!");
    } catch (error) {
      console.error("Error deleting crewmate:", error);
    }
  }

  return (
    <div className="container">
      <h1>Update your Crewmate</h1>
      
      <div>
        <img
          src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png"
          alt="Image"
          width={500}
        />
        
      </div>
    <div>
    <ToastContainer />
    </div>

      <div>
        <h2>Current Crewmate Info:</h2>
        <p> Name: {name} </p>
        <p>Speed: {speed}</p>
        <p>Color: {color}</p>
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
            {[
              "Red",
              "Green",
              "Blue",
              "Purple",
              "Yellow",
              "Orange",
              "Pink",
              "Rainbow",
            ].map((colorOption) => (
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
        <div>
         <button type="submit">Update Crewmate</button>
         <button type="delete" onClick={handleDelete}>Delete Crewmate</button>
         </div>
      </form>
    </div>
  );
}

export default Crewmate;
