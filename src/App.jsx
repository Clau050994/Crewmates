// import { useState } from 'react';
import { useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
import './App.css'


function App() {
  const supabaseUrl = 'https://miutyhwlstoqhnrqjnog.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pdXR5aHdsc3RvcWhucnFqbm9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NDA2NzAsImV4cCI6MjAyODExNjY3MH0.HIn0JJZy4y12n000xZAJiu6nw235WfbsqXbJOUEuCV4'
  const supabase = createClient(supabaseUrl, supabaseKey)

  useEffect(() => {
    getNames();
  }, [])

  async function getNames() {
    const { data } = await supabase.from('User').select();
    console.log(data)
  }

  return (
    <div className="App">
        <header className="App-header">
        <h2 className="title">Create a new crewmate</h2>
        <h4>Here is where you can create your very own set of crewmates before sending them off into space!</h4>
        </header>
        <div>
          <img src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png" alt="Image" width={500} />
        </div>
        <div>
          <img src = "https://shimmering-stardust-c75334.netlify.app/assets/spaceship.3d8f767c.png" alt = "Spaceship" width = {500} />
        </div>
        
    </div>
    
  )
}
export default App
