import { useState } from 'react';
import { Link } from 'react-router-dom';

import posterUnavailable from '../assets/TMDB/poster-unavailbable.jpg'
import { p_300 } from '../assets/TMDB/posterSizes';

const SingleContentCard = ({ id, poster, title, date, media_type, vote_average }) => {
  const [underline, setUnderline] = useState('');

  const ratingBg = `bg-${vote_average >= 7 ? 'green' : vote_average >= 5 ? 'orange' : vote_average >= 0.1 ? 'red' : 'blue'}-600`

  const displayTitle = () => {
    return title.length > 30 ?
      title.split(' ')
        .splice(0, title.split(' ').length - 2)
        .join(' ') + '...' :
      title.length > 25 ?
        title.split(' ')
          .splice(0, title.split(' ').length - 1)
          .join(' ') + '...'
        : title
  }

  return (
    <div className="flex m-3 text-slate-100">
      <div className="relative bg-movie-card w-50 hover:bg-gray-600 hover:shadow-xl duration-100 rounded-t-lg rounded">
        <span
          title={!vote_average ? 'Information not available' : null}
          className={
            `absolute inline-block w-8 h-7 font-medium rounded-full text-center p-1 -m-3 ${ratingBg}`
          }>
          {vote_average || 'N/A'}
        </span>
        <Link to={id + media_type[0]}>
          <img src={poster ? `${p_300}/${poster}` : posterUnavailable} className="rounded-t" alt='Poster' />
          <h2
            className={`text-center font-bold py-1 px-2 ${underline}`}
            onMouseEnter={() => setUnderline('underline underline-offset-1')}
            onMouseLeave={() => setUnderline('')}
            title={title}
          >
            {displayTitle()}
          </h2>
        </Link>

        <div className="flex justify-between brightness-90 pt-2 px-2 pb-1">
          <div> {media_type === 'movie' ? 'Movie' : 'TV'} </div>
          <div> {date?.split('-')[0]} </div>
        </div>
      </div>
    </div>
  );
}

export default SingleContentCard;