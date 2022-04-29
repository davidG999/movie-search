import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";

const Trending = () => {

  const [movies, setMovies] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`)

    setMovies(data.results)
  }

  useEffect(() => {
    fetchTrending()
  }, []);

  return (
    <div className="bg-zinc-800">
      <h2 className="text-slate-300 text-center uppercase font-extrabold tracking-wider p-1 pb-3">Trending</h2>
      <div className="flex flex-wrap justify-evenly w-2/3 my-0 mx-auto h-full">
        {movies?.map((m) => {
          return (
            <MovieCard
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
    </div>
  );
}

export default Trending;