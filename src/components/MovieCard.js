import posterUnavailable from '../assets/TMDB/poster-unavailbable.jpg'
import { p_300 } from './../assets/TMDB/posterSizes';

const MovieCard = ({ id, poster, title, date, media_type, vote_average }) => {
  return (
    <div>
      <img width="250" src={`${p_300}/${poster}` || posterUnavailable} alt={`Poster. ${title}`} />
      <span> {media_type === 'movie' ? 'Movie' : 'TV Series'} </span>
      <span> {date} </span>
    </div>
  );
}

export default MovieCard;