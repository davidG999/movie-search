import { useState, useEffect } from "react";

import $api from "../api/api";

import useGenres from "../hooks/useGenres";

import Genres from "../components/genre/Genres";
import Pagination from "../components/pagination/Pagination";
import SingleContentCard from "../components/single-content-info/SingleContentCard";

import { IGenre, ISingleContent } from "../../types";

const Movies: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<ISingleContent[]>([]);
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<IGenre[]>([]);

  const urlGenres = useGenres(selectedGenres);

  const fetchMovies = async () => {
    const url = `discover/movie?sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${urlGenres}`;

    const { data } = await $api.get(url);

    setMovies(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, urlGenres]);

  return (
    <div className="">
      <h2 className="p-1 text-center text-3xl font-extrabold uppercase tracking-wider text-slate-300">
        Movies
      </h2>

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
              media_type="movie"
              vote_average={m.vote_average}
            />
          );
        })}
      </div>

      {numOfPages > 1 && (
        <Pagination
          setPage={setPage}
          numOfPages={numOfPages > 10 ? 10 : numOfPages}
          currentPage={page}
        />
      )}
    </div>
  );
};

export default Movies;
