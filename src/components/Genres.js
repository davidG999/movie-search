import axios from 'axios';
import { useEffect, useState } from 'react';

const GenreChip = ({ genreTitle }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleIsActive = () => {
    setIsActive(!isActive)
  }

  return (
    <span
      onClick={toggleIsActive}
      className={
        `px-2 py-1 my-1 rounded-full font-semibold text-sm flex align-center w-max cursor-pointer select-none  transition duration-150
        ${isActive ? 'bg-gray-300 text-gray-600 active:bg-gray-400 active:text-gray-700' : 'bg-gray-600 text-gray-300 active:bg-gray-500 active:text-gray-200'}
      `}>

      {genreTitle}

    </span>
  );
}

const Genres = ({
  type,
  genres,
  selectedGenres,
  setGenres,
  setSelectedGenres,
  setPage,
  text
}) => {
  const fetchGenres = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)

    setGenres(data.genres)
  }

  useEffect(() => {
    fetchGenres()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-wrap justify-center space-x-2 mb-3">

      {genres?.map((genre) => {
        return (
          <GenreChip
            key={genre.id}

            genreTitle={genre.name}
          />
        )
      })}

    </div>
  );
}

export default Genres;