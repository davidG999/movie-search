import { useState, useEffect } from "react"

import axios from "axios"

import useGenres from "../hooks/useGenres"

import Genres from "../components/genre/Genres"
import Pagination from "../components/pagination/Pagination"
import SingleContentCard from "../components/single-content-info/SingleContentCard"

import { ISingleContent } from "../../interfaces"

const Series: React.FC = () => {
  const [page, setPage] = useState(1)
  const [series, setSeries] = useState<ISingleContent[]>([])
  const [numOfPages, setNumOfPages] = useState<number>(0)
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const urlGenres = useGenres(selectedGenres)

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
  }, [page, urlGenres])

  return (
    <div className="bg-zinc-800">
      <h2 className="text-slate-300 text-center uppercase font-extrabold p-1 text-3xl tracking-wider">
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
        {series?.map((m) => {
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
          )
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
  )
}

export default Series
