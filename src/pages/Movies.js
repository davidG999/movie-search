import axios from 'axios';
import { useState, useEffect } from 'react';
import SingleContentCard from './../components/SingleContentCard';
import Pagination from './../components/Pagination';
import Genres from './../components/Genres';
import useGenres from './../hooks/useGenres';

const Movies = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const urlGenres = useGenres(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${urlGenres}`
    )

    setMovies(data.results)
    setNumOfPages(data.total_pages)
  }

  useEffect(() => {
    fetchMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, urlGenres]);

  return (
    <div className="">
      <h2 className="text-slate-300 text-center uppercase font-extrabold p-1 text-3xl tracking-wider">Movies</h2>

      <Genres
        type="movie"
        genres={genres}
        selectedGenres={selectedGenres}
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />

      <div className="layout">
        {movies?.map((m) => {
          return (
            <SingleContentCard
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

      {numOfPages > 1 && <Pagination setPage={setPage} numOfPages={numOfPages > 10 ? 10 : numOfPages} currentPage={page} />}
    </div>
  );
}

export default Movies;