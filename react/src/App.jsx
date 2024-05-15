import { useState, useEffect } from 'react'
import './App.css'

import Characters from "./components/Characters"

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";

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
      <Router>
        <Routes>
          <Route path='/' element={<Characters data={data} />} />
          <Route path='/films/:id' element={<h1>Films</h1>}/>
          <Route path='/characters/:id' element={<h1>Characters</h1>}/>
          <Route path='/planets/:id' element={<h1>Planets</h1>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
