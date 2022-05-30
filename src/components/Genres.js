import axios from 'axios';
import { useEffect } from 'react';
import removeIcon from '../assets/icons/remove.svg'

const GenreChip = ({ genreTitle, handleClick, isActive }) => {
  return (
    <span
      onClick={handleClick}
      className={
        `px-2 py-1 my-1 rounded-full font-semibold text-sm flex align-center w-max cursor-pointer select-none transition duration-150 ease-in-out 
        ${isActive ? 'bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-700 removeIcons:hover:brightness-90'
          : 'bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-gray-200'}
      `}>
      {genreTitle}
      {isActive ? <img src={removeIcon} alt="Remove" className="transition duration-150 ease-in-out pl-1" /> : null}
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
}) => {

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  }

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setGenres(data.genres)
  }

  const deselectAll = () => {
    setSelectedGenres([])
    fetchGenres()
  }

  useEffect(() => {
    fetchGenres()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-wrap justify-center space-x-2 my-3 mx-32">
      {selectedGenres.length > 0 &&
        <>
          <span
            onClick={deselectAll}
            className="px-2 py-1 my-1 rounded-full font-semibold text-sm flex align-center w-max cursor-pointer select-none transition duration-150 ease-in-out bg-red-500 text-gray-100 hover:bg-red-600">
            Deselect all
            <img src={removeIcon} alt="Remove" className="transition duration-150 ease-in-out pl-1" />
          </span>
          <span className='border border-gray-400'></span>
        </>
      }

      {selectedGenres?.map((genre) => {
        return (
          <GenreChip
            key={genre.id}

            genreTitle={genre.name}
            isActive={true}
            handleClick={() => handleRemove(genre)}
          />
        )
      })}

      {genres?.map((genre) => {
        return (
          <GenreChip
            key={genre.id}

            genreTitle={genre.name}
            handleClick={() => handleAdd(genre)}
          />
        )
      })}

    </div>
  );
}

export default Genres;