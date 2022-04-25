import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg'

const API_URL = `http://www.omdbapi.com?apikey=${process.env.REACT_APP_API_KEY}`;

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies(searchTerm)
  }, [searchTerm])

  return (
    <div className="app">
      <h1>Movie search</h1>

      <div className="search">
        <input
          placeholder="Search for any movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUpCapture={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              e.target.nextElementSibling.click()
            }
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={(e) => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie, i) => (
              <MovieCard movie={movie} key={i} />
            ))}
          </div>
        )
        : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      }

    </div>
  );
}

export default App;