import { Link } from 'react-router-dom';

import posterUnavailable from '../assets/TMDB/poster-unavailbable.jpg'
import { p_300 } from '../assets/TMDB/posterSizes';

const SingleContentCard = ({ id, poster, title, date, media_type, vote_average }) => {
  return (
    <Link to={id + media_type[0]} className="flex m-3">
      <div className="relative bg-movie-card w-50 cursor-pointer hover:scale-103 duration-100 rounded-t-lg rounded">
        <span className={
          `absolute inline-block w-8 h-7 font-medium rounded-full text-center p-1 -m-3 
          ${vote_average >= 7 ? 'bg-high-rating' : 'bg-low-rating'}`
        }>
          {vote_average}
        </span>
        <img src={`${p_300}/${poster}` || posterUnavailable} className="rounded-t" alt='Poster' />
        <div className="text-center font-bold py-1 px-2">
          {title}
        </div>
        <div className="flex justify-between brightness-90 pt-2 px-2 pb-1">
          <div> {media_type === 'movie' ? 'Movie' : 'TV Series'} </div>
          <div className="bottom-0 left-0"> {date} </div>
        </div>
      </div>
    </Link>
  );
}

export default SingleContentCard;