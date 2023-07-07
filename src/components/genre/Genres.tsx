import { useEffect } from "react"

import axios from "axios"

import GenreChip from "./GenreChip"

import removeIcon from "../../assets/icons/remove.svg"

import { IGenre } from "../../../types"

type GenresProps = {
  type: string
  genres: IGenre[]
  selectedGenres: IGenre[]
  setGenres: any
  setSelectedGenres: any
  setPage: any
}

const Genres: React.FC<GenresProps> = ({
  type,
  genres,
  selectedGenres,
  setGenres,
  setSelectedGenres,
  setPage,
}) => {
  const handleAdd = (genre: IGenre) => {
    setSelectedGenres([...selectedGenres, genre])
    setGenres(genres.filter((g) => g.id !== genre.id))
    setPage(1)
  }

  const handleRemove = (genre: IGenre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    )
    setGenres([...genres, genre])
    setPage(1)
  }

  const fetchGenres = async () => {
    const genreListUrl = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`

    const { data } = await axios.get(genreListUrl)

    setGenres(data.genres)
  }

  const deselectAll = () => {
    setSelectedGenres([])
    fetchGenres()
  }

  useEffect(() => {
    fetchGenres()
  }, [])

  return (
    <div className="flex flex-wrap justify-center space-x-2 my-3 mx-32">
      {selectedGenres.length > 0 && (
        <>
          <span
            onClick={deselectAll}
            className="px-2 py-1 my-1 rounded-full font-semibold text-sm flex align-center w-max cursor-pointer select-none transition duration-150 ease-in-out bg-red-500 text-gray-100 hover:bg-red-600"
          >
            Deselect all
            <img
              src={removeIcon}
              alt="Remove"
              className="transition duration-150 ease-in-out pl-1"
            />
          </span>
          <span className="border border-gray-400"></span>
        </>
      )}

      {selectedGenres?.map((genre) => (
        <GenreChip
          key={genre.id}
          genreTitle={genre.name}
          isActive={true}
          handleClick={() => handleRemove(genre)}
        />
      ))}

      {genres?.map((genre) => (
        <GenreChip
          key={genre.id}
          genreTitle={genre.name}
          handleClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  )
}

export default Genres
