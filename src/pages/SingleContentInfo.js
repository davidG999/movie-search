import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { p_300 } from '../assets/TMDB/posterSizes';
import posterUnavailable from '../assets/TMDB/poster-unavailbable.jpg'

import convertDate from '../utils/convertDate';
import minutesToHours from './../utils/minutesToHours';

const SingleContentInfo = () => {
  const { id } = useParams()
  const [content, setContent] = useState({});
  const [contentRatings, setContentRatings] = useState();
  const media_type = id.slice(-1) === 't' ? 'tv' : 'movie'

  const fetchSingleContentInfo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type
      }/${id.slice(0, -1)
      }?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )

    setContent(data)
  }

  const fetchTvContentRatings = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id.slice(0, -1)}/content_ratings?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )

    data.results[0] && setContentRatings(data.results[0].rating)
  }

  const {
    title, name,
    vote_average, vote_count,
    first_air_date, release_date,
    runtime, episode_run_time,
    overview,
    poster_path,
    popularity
  }
    = content;

  const checkForRuntime = () => {
    if (episode_run_time?.length === 0) return ''
    if (episode_run_time?.length === 1) return episode_run_time + 'm'
    if (episode_run_time?.length > 1) {
      episode_run_time.sort((a, b) => a - b)
      return episode_run_time[0] + '-' + episode_run_time.slice(-1) + 'm'
    }
    return minutesToHours(runtime)
  }

  const ratingBg = `bg-${vote_average >= 7 ? 'green' : vote_average >= 5 ? 'orange' : vote_average >= 0.1 ? 'red' : 'blue'}-600`

  function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
  }

  const popularityInfo = `Popularity is based on the information below
  • Number of votes for the day
  • Number of views for the day
  • Number of users who marked it as a "favourite" for the day
  • Number of users who added it to their "watchlist" for the day
  • Release date / Next/last episode to air date
  • Number of total votes 
  • Previous days score
  `

  useEffect(() => {
    fetchSingleContentInfo()
    id.slice(-1) === 't' && fetchTvContentRatings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-wrap">
      <div className="w-full rounded overflow-hidden shadow-lg m-4 flex justify-between">

        <div className="md:flex-shrink-0">
          <img src={poster_path ? `${p_300}${poster_path}` : posterUnavailable} className="rounded" alt='Poster' />
        </div>

        <div className="flex-col flex-grow px-6 bg-color-333">
          <h3 className="font-bold text-5xl text-gray-200 mb-4"> {title || name} </h3>

          <div className="flex justify-between mb-4">
            <div className="flex text-center">
              <div className="flex flex-col mr-6">
                <span className='font-semibold inline-block w-full'> Date </span>
                <span className='inline-block w-full border border-slate-500 p-1.5'> {first_air_date || release_date ? convertDate(first_air_date || release_date) : 'N/A'} </span>
              </div>
              <div className="flex flex-col mr-6">
                <span className='font-semibold inline-block w-full'> Runtime </span>
                <span className='inline-block w-full border border-slate-500 p-1.5'> {checkForRuntime() || 'N/A'} </span>
              </div>
              {contentRatings &&
                <div className="flex flex-col mr-6">
                  <span className='font-semibold inline-block w-full'> Content rating </span>
                  <span className='inline-block w-full border border-slate-500 p-1.5'> {contentRatings} </span>
                </div>}
            </div>
          </div>

          <div className="flex text-center mb-4">
            <div className="flex-col mr-6">
              <span className='font-semibold inline-block w-full'> TMDb rating </span>
              <div className="flex">
                <span
                  title={!vote_average ? 'Information not available' : null}
                  className={`text-white inline-block w-full h-full p-1.5 font-bold text-md
                      ${ratingBg}`
                  }>
                  {vote_average && vote_average + '/10' || 'N/A'}
                </span>
                <span
                  title="Number of votes"
                  className='bg-gray-500 text-white inline-block w-full h-full p-1.5 font-medium opacity-75'>
                  {vote_count ? kFormatter(vote_count) : 'N/A'}
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span title={popularityInfo} className='font-semibold inline-block w-full'> Popularity </span>
              <span title={popularityInfo} className='border border-slate-500 w-full h-full pt-1.5'> {popularity && Math.floor(popularity)} </span>
            </div>
          </div>

          <div className="flex-grow mt-3 ">
            <p className="text-xl text-gray-100">{overview || 'No overview'}</p>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}

export default SingleContentInfo;