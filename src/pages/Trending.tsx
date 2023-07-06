import { useEffect, useState } from "react"

import axios from "axios"

import Pagination from "../components/pagination/Pagination"
import SingleContentCard from "../components/single-content-info/SingleContentCard"

import { ISingleContent } from "../../interfaces"

const Trending: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [numOfPages, setNumOfPages] = useState<number>(0)
  const [content, setContent] = useState<ISingleContent[]>([])
  const [time, setTime] = useState("day")

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/${time}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    )

    setContent(data.results)
    setNumOfPages(data.total_pages)
  }

  useEffect(() => {
    fetchTrending()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, page])

  return (
    <div className="">
      <h2 className="text-slate-300 text-center uppercase font-extrabold tracking-wider p-1 text-3xl transition duration-500 ease-out">
        {" "}
        Trending{" "}
      </h2>

      <ul className="p-1 my-3 flex justify-center text-center font-semibold text-gray-100 select-none">
        <li
          onClick={() => {
            setTime("day")
            setPage(1)
          }}
          className={`mr-2 cursor-pointer p-4 border border-solid border-slate-600 rounded hover:scale-103
          ${time === "day" ? "bg-slate-600" : ""}
          `}
        >
          {" "}
          Today{" "}
        </li>
        <li
          onClick={() => {
            setTime("week")
            setPage(1)
          }}
          className={`mr-2 cursor-pointer p-4 border border-solid border-slate-600 rounded hover:scale-103
          ${time === "week" ? "bg-slate-600" : ""}
          `}
        >
          {" "}
          This week{" "}
        </li>
      </ul>

      <div className="layout">
        {content?.map((c) => {
          return (
            <SingleContentCard
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.release_date || c.first_air_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
              vote_count={c.vote_count}
              popularity={c.popularity}
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

export default Trending
