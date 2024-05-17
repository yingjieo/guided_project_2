import { useState, useEffect } from 'react'
import './App.css'

import Characters from './components/Characters';
import PlanetPage from './components/PlanetPage';
import CharacterPage from './components/CharacterPage';
import FilmPage from './components/FilmPage';
import Home from './components/Home';

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
      <Home />
      <h1>Star Wars Universe Lookup</h1>
      <Router>
        <Routes>
          <Route path='/' element={<Characters data={data} frontPage={true}/>} />
          <Route path='/characters' element={<Characters data={data} frontPage={true}/>} />
          <Route path='/films/:id' element={<FilmPage />}/>
          <Route path='/characters/:id' element={<CharacterPage />}/>
          <Route path='/planets/:id' element={<PlanetPage />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
