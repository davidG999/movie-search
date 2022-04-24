import { useEffect } from 'react';
import API_KEY from './API_KEY';
import './App.css';
import SearchIcon from './search.svg'

const API_URL = `http://www.omdbapi.com?apikey=${API_KEY}`;

const App = () => {
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
  }

  useEffect(() => {
    searchMovies('superman')
  }, [])

  return (
    <h1>Movie search</h1>
  );
}

export default App;