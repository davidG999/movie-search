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

  const minutesToHours = (m) => {
    return `${Math.trunc(m / 60)}h ${m % 60}m`
  }

  function convertDate(date) {
    console.log(date)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let temp_date = date.split("-")
    return `${months[Number(temp_date[1]) - 1]} ${temp_date[2]}, ${temp_date[0]}`
  }

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
          <span className="text-xl">{first_air_date || release_date ? convertDate(first_air_date || release_date) : null}</span>
          <span className="text-xl">{episode_run_time ? episode_run_time + 'm' : minutesToHours(runtime)}</span>
          <div className="flex-grow mt-3">
            <p className="text-xl text-gray-100 ">{overview}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SingleContentInfo;