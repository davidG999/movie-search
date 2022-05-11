import { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import { p_300 } from '../assets/TMDB/posterSizes';
import posterUnavailable from '../assets/TMDB/poster-unavailbable.jpg'

const SingleContentInfo = () => {
  const { id } = useParams()
  let { pathname } = useLocation();
  const [content, setContent] = useState({});

  const media_type = pathname.slice(-1) === 't' ? 'tv' : 'movie'

  const fetchSingleContentInfo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type
      }/${id.slice(0, -1)
      }?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )

    setContent(data)
  }

  const { title, name, first_air_date, release_date, runtime, episode_run_time, overview, poster_path } = content

  useEffect(() => {
    fetchSingleContentInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-wrap">
      <div className="w-full rounded overflow-hidden shadow-lg m-4 flex justify-between">

        <div className="md:flex-shrink-0">
          <img src={`${p_300}${poster_path}` || posterUnavailable} className="rounded-t" alt='Poster' />
        </div>
        <div className="flex flex-col flex-grow px-8 py-4 bg-color-333">
          <h3 className="font-bold text-4xl text-gray-200 movie--title"> {title || name} </h3>
          <span className="text-xl">{first_air_date || release_date}</span>
          <span className="text-xl">{episode_run_time || runtime} min</span>
          <div className="flex-grow mt-3">
            <p className="text-xl text-gray-100 ">{overview}</p>
          </div>

          {/* <div className="flex justify-between mb-2">
            <button className="mr-4 text-gray-200">More Info</button>
            <button className="font-bold py-2 px-4 rounded bg-orange-200 text-orange-700">Add to List</button>
          </div> */}
        </div>

      </div>
    </div>
  );
}

export default SingleContentInfo;