import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './../components/Pagination';
import SingleContentCard from './../components/SingleContentCard';

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("megamind");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
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
      <h2 className="text-slate-300 text-center uppercase font-extrabold p-1 tracking-wider">Search</h2>

      <div className="flex justify-center">
        <input
          type="search" placeholder="Search..."
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full text-gray-100 bg-gray-700 rounded transition ease-in-out p-3 mx-4 mt-4
            focus:text-gray-200 focus:bg-gray-600 focus:outline-none"
        />
      </div>

      <ul className="p-1 m-3 flex text-center text-gray-100">
        <li
          onClick={() => {
            setType(0)
            setPage(1);
          }}
          className="mr-2 cursor-pointer p-4 border border-solid border-slate-600 rounded"> Movies </li>
        <li
          onClick={() => {
            setType(1);
            setPage(1);
          }}
          className="mr-2 cursor-pointer p-4 border border-solid border-slate-600 rounded"> TV Series</li>
      </ul>

      <div className="flex flex-wrap justify-evenly w-2/3 my-0 mx-auto h-full">
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
      {searchText &&
        content.length < 1 &&
        (type ? <h2 className="text-center">No series found</h2> : <h2 className="text-center">No movies found</h2>)}

      {numOfPages > 1 && <Pagination setPage={setPage} />}
    </div>

  );
}

export default Search;