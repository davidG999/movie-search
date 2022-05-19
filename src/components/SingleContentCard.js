import { useState } from 'react';
import { Link } from 'react-router-dom';

import posterUnavailable from '../assets/TMDB/poster-unavailbable.jpg'
import { p_300 } from '../assets/TMDB/posterSizes';

const SingleContentCard = ({ id, poster, title, date, media_type, vote_average }) => {
  const [underline, setUnderline] = useState('');

  const ratingStyles =
    vote_average >= 7 ? 'bg-green-600'
      : vote_average >= 5 ? 'bg-orange-600'
        : vote_average >= 0.1 ? 'bg-red-600'
          : 'bg-blue-600 text-white w-10';

  return (
    <div className="flex m-3 text-slate-100">
      <div className="relative bg-movie-card w-50 hover:bg-gray-600 hover:shadow-xl duration-100 rounded-t-lg rounded">
        <span className={
          `absolute inline-block w-8 h-7 font-medium rounded-full text-center p-1 -m-3 
          ${ratingStyles}`
        }>
          {vote_average || 'N/A'}
        </span>
        <Link to={id + media_type[0]}>
          <img src={`${p_300}/${poster}` || posterUnavailable} className="rounded-t" alt='Poster' />
          <div
            className={`text-center font-bold py-1 px-2 ${underline}`}
            onMouseEnter={() => setUnderline('underline underline-offset-1 ')}
            onMouseLeave={() => setUnderline('')}
            title={title}
          >
            {title.length > 30 ? title.slice(0, 25) + '...' : title}
          </div>
        </Link>

        <div className="flex justify-between brightness-90 pt-2 px-2 pb-1">
          <div> {media_type === 'movie' ? 'Movie' : 'TV'} </div>
          <div className="bottom-0 left-0"> {date.split('-')[0]} </div>

        </div>
      </div>
    </div>
  );
}

export default SingleContentCard;