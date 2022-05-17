import { useEffect, useState } from "react";
import SingleContentCard from "../components/SingleContentCard";
import axios from "axios";
import Pagination from './../components/Pagination';

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [time, setTime] = useState('day');

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/${time}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    )

    setContent(data.results)
  }

  useEffect(() => {
    fetchTrending()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, page]);

  return (
    <div className="">
      <h2 className="text-slate-300 text-center uppercase font-extrabold tracking-wider p-1 pb-3 transition duration-500 ease-out">Trending</h2>

      <ul className="p-1 m-3 flex justify-center text-center font-semibold text-gray-100 select-none">
        <li
          onClick={() => {
            setTime('day');
            setPage(1);
          }}
          className={`mr-2 cursor-pointer p-4 border border-solid border-slate-600 rounded hover:scale-103
          ${time === 'day' ? 'bg-slate-600' : ''}
          `}> Today </li>
        <li
          onClick={() => {
            setTime('week');
            setPage(1);
          }}
          className={`mr-2 cursor-pointer p-4 border border-solid border-slate-600 rounded hover:scale-103
          ${time === 'week' ? 'bg-slate-600' : ''}
          `}> This week </li>
      </ul>

      <div className="layout">
        {content?.map((m) => {
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