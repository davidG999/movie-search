import { useEffect, useState } from "react";

import $api from "../utils/api";

import Pagination from "../components/pagination/Pagination";
import SingleContentCard from "../components/single-content-info/SingleContentCard";

import { ISingleContent } from "../../types";

const Search: React.FC = () => {
  const [type, setType] = useState<0 | 1>(0);
  const [searchText, setSearchText] = useState<string>("Megamind");
  const [page, setPage] = useState<number>(1);
  const [content, setContent] = useState<ISingleContent[]>([]);
  const [numOfPages, setNumOfPages] = useState<number>(0);

  const fetchSearch = async () => {
    try {
      const { data } = await $api.get(
        `search/${
          type ? "tv" : "movie"
        }?query=${searchText}&page=${page}&include_adult=false`,
      );

      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, searchText, page]);

  return (
    <div className="bg-zinc-800">
      <h2 className="p-1 text-center text-3xl font-extrabold uppercase tracking-wider text-slate-300">
        Search
      </h2>

      <div className="my-3 flex justify-center">
        <input
          type="search"
          placeholder="Search..."
          onChange={(e) => setSearchText(e.target.value)}
          className="mx-4 mt-4 w-full rounded bg-gray-700 p-3 text-gray-100 transition ease-in-out focus:bg-gray-600 focus:text-gray-200 focus:outline-none"
        />
      </div>

      <ul className="m-3 flex select-none justify-center p-1 text-center font-semibold text-gray-100">
        <li
          onClick={() => {
            setType(0);
            setPage(1);
          }}
          className={`mr-2 cursor-pointer rounded border border-solid border-slate-600 p-4 hover:scale-103 ${!type && "bg-slate-600"} `}
        >
          Movies
        </li>
        <li
          onClick={() => {
            setType(1);
            setPage(1);
          }}
          className={`mr-2 cursor-pointer rounded border border-solid border-slate-600 p-4 hover:scale-103 ${type && "bg-slate-600"} `}
        >
          TV Series
        </li>
      </ul>

      <div className="layout">
        {content?.map((c) => (
          <SingleContentCard
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.release_date || c.first_air_date}
            media_type={type ? "tv" : "movie"}
            vote_average={c.vote_average}
          />
        ))}
      </div>

      {searchText && content.length < 1 && (
        <h2 className="text-center">No {type ? "series" : "movies"} found</h2>
      )}

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

export default Search;
