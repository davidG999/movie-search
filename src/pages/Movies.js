import axios from 'axios';
import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import Pagination from './../components/Pagination';

const Movies = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    )

    setMovies(data.results)
    setNumOfPages(data.total_pages)
  }

  useEffect(() => {
    fetchMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <h2 className="text-slate-300 text-center uppercase font-extrabold p-1 tracking-wider">Movies</h2>

      <div className="flex flex-wrap justify-evenly w-2/3 my-0 mx-auto h-full">
        {movies?.map((m) => {
          return (
            <MovieCard
              key={m.id}

              id={m.id}
              poster={m.poster_path}
              title={m.title || m.name}
              date={m.release_date || m.first_air_date}
              media_type='movie'
              vote_average={m.vote_average}
            />
          )
        })}
      </div>

      {numOfPages > 1 && <Pagination setPage={setPage} />}
    </div>
  );
}

export default Movies;