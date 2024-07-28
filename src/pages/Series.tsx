import { useEffect, useState } from "react";

import useGenres from "../hooks/useGenres";

import $api from "../utils/api";

import Genres from "../components/genre/Genres";
import Pagination from "../components/pagination/Pagination";
import SingleContentCard from "../components/single-content-info/SingleContentCard";

import { IGenre, ISingleContent } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const Series: React.FC = () => {
  const [page, setPage] = useState(1);
  const [series, setSeries] = useState<ISingleContent[]>([]);
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<IGenre[]>([]);

  const urlGenres = useGenres(selectedGenres);

  const url = `discover/tv?sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${urlGenres}`;

  const { data, isLoading } = useQuery<
    AxiosResponse<{
      page: number;
      results: ISingleContent[];
      total_pages: number;
      total_results: number;
    }>,
    AxiosError
  >({
    queryKey: [url],
    queryFn: () => $api.get(url),
  });

  useEffect(() => {
    if (!data || isLoading) return;
    setNumOfPages(data.data.total_pages);
  }, [urlGenres]);

  return (
    <div className="bg-zinc-800">
      <h2 className="p-1 text-center text-3xl font-extrabold uppercase tracking-wider text-slate-300">
        TV Series
      </h2>

      <Genres
        type="tv"
        genres={genres}
        selectedGenres={selectedGenres}
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />

      <div className="layout">
        {data &&
          data.data.results?.map((m) => {
            return (
              <SingleContentCard
                key={m.id}
                id={m.id}
                poster={m.poster_path}
                title={m.title || m.name}
                date={m.release_date || m.first_air_date}
                media_type="tv"
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

export default Series;
