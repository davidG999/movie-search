import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { p_154, p_300, p_500 } from '../assets/TMDB/posterSizes';
import posterUnavailable from '../assets/TMDB/poster-unavailbable.jpg'
import noPicture from '../assets/TMDB/no-picture.jpg'

import convertDate from '../utils/convertDate';
import minutesToHours from './../utils/minutesToHours';
import NotFound from './NotFound';

const SingleContentInfo = () => {
  const { id } = useParams()
  const [content, setContent] = useState({});
  const [contentRatings, setContentRatings] = useState();
  const [credits, setCredits] = useState();
  const [notFound, setNotFound] = useState(false);
  const media_type = id.slice(-1) === 't' ? 'tv' : 'movie'

  const fetchSingleContentInfo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type
      }/${id.slice(0, -1)
      }?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    ).catch(err => { if (err.response.status === 404) setNotFound(<NotFound />) })

    data && setContent(data)
  }

  const fetchTvContentRatings = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id.slice(0, -1)}/content_ratings?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )

    data.results[0] && setContentRatings(data.results[0].rating)
  }

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id.slice(0, -1)}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    // console.log(data.cast)
    if (data.cast.length > 10) data.cast.length = 10
    data && setCredits(data.cast)
  }

  const {
    title, name,
    genres,
    vote_average, vote_count,
    first_air_date, release_date,
    runtime, episode_run_time,
    overview,
    poster_path,
    popularity
  }
    = content;

  const checkEpisodeRuntime = () => {
    if (episode_run_time) {
      if (episode_run_time?.length === 0) return 'N/A'
      if (episode_run_time?.length === 1) return episode_run_time + 'm'
      if (episode_run_time?.length > 1) {
        episode_run_time.sort((a, b) => a - b)
        return episode_run_time[0] + '-' + episode_run_time.slice(-1) + 'm'
      }
    }
  }

  const shortenNameAndCharacter = (str) => {
    if (str && str?.length > 15) return str.slice(0, 14) + '...'; // 18 is max, i guess
    return str
  }

  const ratingBg = vote_average >= 7 ? 'bg-green-600' : vote_average >= 5 ? 'bg-orange-600' : vote_average >= 0.1 ? 'bg-red-600' : 'bg-blue-600'

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
    fetchCredits()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {notFound ||
        <div className="flex flex-wrap">
          <h3 className="font-bold text-5xl text-gray-200 mb-4 text-center my-3 mx-auto"> {title || name} </h3>

          <div className="w-full rounded overflow-hidden shadow-2xl mx-4 flex justify-between">

            <div className="md:flex-shrink-0">
              <img src={poster_path ? `${p_300}${poster_path}` : posterUnavailable} className="rounded" alt='Poster' />
            </div>

            <div className="flex-col flex-grow px-6 py-2">

              <div className="flex justify-between mb-4">
                <div className="flex text-center">
                  <div className="flex-col mr-6">
                    <span className='font-semibold text-xl inline-block w-full'> Date </span>
                    <span className='inline-block w-full border border-slate-500 p-1.5'> {first_air_date || release_date ? convertDate(first_air_date || release_date) : 'N/A'} </span>
                  </div>
                  <div className="flex-col mr-6">
                    <span className='font-semibold text-xl inline-block w-full'> Runtime </span>
                    <span className='inline-block w-full border border-slate-500 p-1.5'> {episode_run_time ? checkEpisodeRuntime() : runtime ? minutesToHours(runtime) : 'N/A'} </span>
                  </div>
                  {contentRatings &&
                    <div className="flex-col mr-6">
                      <span className='font-semibold text-xl inline-block w-full'> Content rating </span>
                      <span className='inline-block w-full border border-slate-500 p-1.5'> {contentRatings} </span>
                    </div>}
                </div>
              </div>

              <div className="flex justify-between mb-4">
                <div className="flex">
                  <div className="flex-col">
                    <div className="flex">
                      {genres?.map(g => (
                        <span
                          key={g.id}
                          className='last:mr-0 mr-3 px-2 py-1 rounded-full font-semibold text-sm flex align-center w-max bg-gray-600 text-gray-300'>
                          {g.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex text-center mb-4">
                <div className="flex-col mr-6">
                  <span className='font-semibold text-xl inline-block w-full'> TMDb rating </span>
                  <div className="flex">
                    <span
                      title={!vote_average ? 'Information not available' : null}
                      className={`text-white inline-block w-full p-1.5 font-bold text-md
                      ${ratingBg}`
                      }>
                      {vote_average ? vote_average + '/10' : 'N/A'}
                    </span>
                    <span
                      title="Number of votes"
                      className='bg-gray-500 text-white inline-block w-full p-1.5 font-medium opacity-75'>
                      {vote_count ? kFormatter(vote_count) : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span title={popularityInfo} className='font-semibold text-xl inline-block w-full'> Popularity </span>
                  <span title={popularityInfo} className='border border-slate-500 w-full h-full pt-1.5'> {popularity && Math.floor(popularity)} </span>
                </div>
              </div>

              <div className="border border-gray-400 mb-4"></div>

              <div className="flex-grow">
                <p className="text-xl text-gray-100">{overview || 'No overview'}</p>
              </div>

            </div>
          </div>

          <div className='flex  rounded shadow-2xl m-4  pb-20'>
            {credits?.map((c) => (
              <div key={c.id} className="w-full rounded-lg bg-movie-card mr-2 last:mr-0">
                <img
                  className={`w-full rounded-t-lg ${!c.profile_path && 'w-200'}`}
                  src={c.profile_path ? `${credits.length > 5 ? p_500 : p_154}` + c.profile_path : noPicture} alt="Profile"
                />

                <div title={c.name} className="p-1 text-center font-medium">
                  {c.name && shortenNameAndCharacter(c.name)}
                </div>

                <div title={c.character} className="p-2 opacity-80">
                  as {c.character && shortenNameAndCharacter(c.character)}
                </div>
              </div>
            ))}
          </div>
        </div>}
    </>
  );
}

export default SingleContentInfo;

// ! CONTENTS ----------------------------------

// * MOVIE
// {
//   "adult": false,
//   "backdrop_path": "/gG9fTyDL03fiKnOpf2tr01sncnt.jpg",
//   "belongs_to_collection": null,
//   "budget": 75000000,
//   "genres": [
//     {
//       "id": 28,
//       "name": "Action"
//     },
//     {
//       "id": 878,
//       "name": "Science Fiction"
//     },
//     {
//       "id": 14,
//       "name": "Fantasy"
//     }
//   ],
//   "homepage": "https://www.morbius.movie/",
//   "id": 526896,
//   "imdb_id": "tt5108870",
//   "original_language": "en",
//   "original_title": "Morbius",
//   "overview": "Dangerously ill with a rare blood disorder, and determined to save others suffering his same fate, Dr. Michael Morbius attempts a desperate gamble. What at first appears to be a radical success soon reveals itself to be a remedy potentially worse than the disease.",
//   "popularity": 12394.971,
//   "poster_path": "/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
//   "production_companies": [
//     {
//       "id": 5,
//       "logo_path": "/71BqEFAF4V3qjjMPCpLuyJFB9A.png",
//       "name": "Columbia Pictures",
//       "origin_country": "US"
//     },
//     {
//       "id": 7505,
//       "logo_path": "/837VMM4wOkODc1idNxGT0KQJlej.png",
//       "name": "Marvel Entertainment",
//       "origin_country": "US"
//     }
//   ],
//   "production_countries": [
//     {
//       "iso_3166_1": "US",
//       "name": "United States of America"
//     }
//   ],
//   "release_date": "2022-03-30",
//   "revenue": 161000000,
//   "runtime": 104,
//   "spoken_languages": [
//     {
//       "english_name": "English",
//       "iso_639_1": "en",
//       "name": "English"
//     }
//   ],
//   "status": "Released",
//   "tagline": "A new Marvel legend arrives.",
//   "title": "Morbius",
//   "video": false,
//   "vote_average": 6.4,
//   "vote_count": 1070
// }



// * TV

// {
//   "adult": false,
//   "backdrop_path": "/vfWdZYGR5505zrCdgTHteFyARu3.jpg",
//   "created_by": [
//     {
//       "id": 1147923,
//       "credit_id": "5f970adf7719d700363e004a",
//       "name": "Jeremy Slater",
//       "gender": 2,
//       "profile_path": "/fQKd49lOrhU80PQla8mmx3vSR20.jpg"
//     }
//   ],
//   "episode_run_time": [
//     47
//   ],
//   "first_air_date": "2022-03-30",
//   "genres": [
//     {
//       "id": 10759,
//       "name": "Action & Adventure"
//     },
//     {
//       "id": 10765,
//       "name": "Sci-Fi & Fantasy"
//     },
//     {
//       "id": 9648,
//       "name": "Mystery"
//     }
//   ],
//   "homepage": "https://www.disneyplus.com/series/moon-knight/4S3oOF1knocS",
//   "id": 92749,
//   "in_production": false,
//   "languages": [
//     "en"
//   ],
//   "last_air_date": "2022-05-04",
//   "last_episode_to_air": {
//     "air_date": "2022-05-04",
//     "episode_number": 6,
//     "id": 3453975,
//     "name": "Gods and Monsters",
//     "overview": "With Layla tracking down Harrow, Marc, Steven, and Khonshu must return to Cairo to stop Ammit as she looks to threaten humanity once more.",
//     "production_code": "",
//     "runtime": 44,
//     "season_number": 1,
//     "still_path": "/owNx8ZoryZZzp6WYqmTV9Umf1bQ.jpg",
//     "vote_average": 7.1,
//     "vote_count": 15
//   },
//   "name": "Moon Knight",
//   "next_episode_to_air": null,
//   "networks": [
//     {
//       "name": "Disney+",
//       "id": 2739,
//       "logo_path": "/uzKjVDmQ1WRMvGBb7UNRE0wTn1H.png",
//       "origin_country": "US"
//     }
//   ],
//   "number_of_episodes": 6,
//   "number_of_seasons": 1,
//   "origin_country": [
//     "US"
//   ],
//   "original_language": "en",
//   "original_name": "Moon Knight",
//   "overview": "When Steven Grant, a mild-mannered gift-shop employee, becomes plagued with blackouts and memories of another life, he discovers he has dissociative identity disorder and shares a body with mercenary Marc Spector. As Steven/Marc’s enemies converge upon them, they must navigate their complex identities while thrust into a deadly mystery among the powerful gods of Egypt.",
//   "popularity": 2758.413,
//   "poster_path": "/YksR65as1ppF2N48TJAh2PLamX.jpg",
//   "production_companies": [
//     {
//       "id": 420,
//       "logo_path": "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
//       "name": "Marvel Studios",
//       "origin_country": "US"
//     }
//   ],
//   "production_countries": [
//     {
//       "iso_3166_1": "US",
//       "name": "United States of America"
//     }
//   ],
//   "seasons": [
//     {
//       "air_date": "2022-03-30",
//       "episode_count": 6,
//       "id": 130604,
//       "name": "Season 1",
//       "overview": "",
//       "poster_path": "/11keFudto4QrgrXChukexJwdHPe.jpg",
//       "season_number": 1
//     }
//   ],
//   "spoken_languages": [
//     {
//       "english_name": "English",
//       "iso_639_1": "en",
//       "name": "English"
//     }
//   ],
//   "status": "Ended",
//   "tagline": "Embrace the chaos.",
//   "type": "Miniseries",
//   "vote_average": 8.3,
//   "vote_count": 872
// }