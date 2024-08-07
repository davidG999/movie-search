import { useEffect, useState } from "react";

import $api from "../utils/api";

import Pagination from "../components/pagination/Pagination";
import SingleContentCard from "../components/single-content-info/SingleContentCard";

import { ISingleContent } from "../../types";

const Trending: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [content, setContent] = useState<ISingleContent[]>([]);
  const [time, setTime] = useState("day");

  const fetchTrending = async () => {
    const { data } = await $api.get(`trending/all/${time}?page=${page}`);

    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, page]);

  return (
    <div className="">
      <h2 className="p-1 text-center text-3xl font-extrabold uppercase tracking-wider text-slate-300 transition duration-500 ease-out">
        Trending
      </h2>

      <ul className="my-3 flex select-none justify-center p-1 text-center font-semibold text-gray-100">
        <li
          onClick={() => {
            setTime("day");
            setPage(1);
          }}
          className={`mr-2 cursor-pointer rounded border border-solid border-slate-600 p-4 hover:scale-103 ${time === "day" ? "bg-slate-600" : ""} `}
        >
          Today
        </li>
        <li
          onClick={() => {
            setTime("week");
            setPage(1);
          }}
          className={`mr-2 cursor-pointer rounded border border-solid border-slate-600 p-4 hover:scale-103 ${time === "week" ? "bg-slate-600" : ""} `}
        >
          This week
        </li>
      </ul>

      <div className="layout">
        {content?.map(
          ({
            id,
            poster_path,
            title,
            name,
            release_date,
            first_air_date,
            ...rest
          }) => {
            return (
              <SingleContentCard
                key={id}
                id={id}
                poster={poster_path}
                title={title || name}
                date={release_date || first_air_date}
                {...rest}
              />
            );
          },
        )}
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

export default Trending;
