import { useState, useEffect } from 'react'
import './App.css'

import Characters from "./components/Characters"

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/characters`);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setData(json_response) // assign JSON response to the data variable.
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Star Wars Universe Lookup</h1>
      <Characters data={data} />
    </div>
  )
}

export default App
