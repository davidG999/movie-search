import { useEffect, useState } from "react";
import SingleContentCard from "../components/SingleContentCard";
import axios from "axios";
import Pagination from './../components/Pagination';

const Trending = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)

    setMovies(data.results)
  }

  useEffect(() => {
    fetchTrending()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="">
      <h2 className="text-slate-300 text-center uppercase font-extrabold tracking-wider p-1 pb-3">Trending</h2>
      <div className="flex flex-wrap justify-evenly w-2/3 my-0 mx-auto h-full">
        {movies?.map((m) => {
          return (
            <SingleContentCard
              key={m.id}

              id={m.id}
              poster={m.poster_path}
              title={m.title || m.name}
              date={m.release_date || m.first_air_date}
              media_type={m.media_type}
              vote_average={m.vote_average}
            />
          )
        })}
      </div>

      <Pagination setPage={setPage} />
    </div>
  );
}

export default Trending;