import axios from 'axios';
import { useState, useEffect } from 'react';
import SingleContentCard from '../components/SingleContentCard';
import Pagination from './../components/Pagination';
import Genres from './../components/Genres';
import useGenres from './../hooks/useGenres';

const Series = () => {
  const [page, setPage] = useState(1);
  const [series, setSeries] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const urlGenres = useGenres(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${urlGenres}`
    )

    setSeries(data.results)
    setNumOfPages(data.total_pages)
  }

  useEffect(() => {
    fetchSeries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, urlGenres]);

  return (
    <div className="bg-zinc-800">
      <h2 className="text-slate-300 text-center uppercase font-extrabold p-1 tracking-wider">TV Series</h2>

      <Genres
        type="tv"
        genres={genres}
        selectedGenres={selectedGenres}
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />

      <div className="flex flex-wrap justify-evenly w-2/3 my-0 mx-auto h-full">
        {series?.map((m) => {
          return (
            <SingleContentCard
              key={m.id}

              id={m.id}
              poster={m.poster_path}
              title={m.title || m.name}
              date={m.release_date || m.first_air_date}
              media_type='tv'
              vote_average={m.vote_average}
            />
          )
        })}
      </div>

      {numOfPages > 1 && <Pagination setPage={setPage} />}

    </div>
  );
}

export default Series;