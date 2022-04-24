import { useEffect, useState } from 'react';
import API_KEY from './API_KEY';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg'

const API_URL = `http://www.omdbapi.com?apikey=${API_KEY}`;

const movie1 = {
  "Title": "Batman v Superman: Dawn of Justice",
  "Year": "2016",
  "imdbID": "tt2975590",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
}

const App = () => {
  const [movies, setMovies] = useState([])

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
  }

  useEffect(() => {
    searchMovies('superman')
  }, [])

  return (
    <div className="app">
      <h1>Movie search</h1>

      <div className="search">
        <input
          placeholder="Search for any movie"
          onChange={() => { }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => { }} />
      </div>

      <div className="container">
        <MovieCard movie1={movie1} />
      </div>
    </div>
  );
}

export default App;