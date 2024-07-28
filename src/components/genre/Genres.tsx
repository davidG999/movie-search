import $api from "../../utils/api";

import GenreChip from "./GenreChip";
import { AxiosError, AxiosResponse } from "axios";

import removeIcon from "../../assets/icons/remove.svg";

import { IGenre } from "../../../types";
import { useQuery } from "@tanstack/react-query";

type GenresProps = {
  type: string;
  genres: IGenre[];
  selectedGenres: IGenre[];
  setGenres: React.Dispatch<React.SetStateAction<IGenre[]>>;
  setSelectedGenres: React.Dispatch<React.SetStateAction<IGenre[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Genres: React.FC<GenresProps> = ({
  type,
  genres,
  selectedGenres,
  setGenres,
  setSelectedGenres,
  setPage,
}) => {
  const { data, refetch } = useQuery<
    AxiosResponse<{ genres: IGenre[] }>,
    AxiosError
  >({
    queryKey: ["genres", type, "list"],
    queryFn: () => $api.get(`genre/${type}/list`),
    staleTime: 1 * 1000 * 60 * 60 * 24, // 24 hours
  });

  const handleAdd = (genre: IGenre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre: IGenre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id),
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const deselectAll = () => {
    setSelectedGenres([]);
  };

  return (
    <div className="mx-32 my-3 flex flex-wrap justify-center space-x-2">
      {selectedGenres.length > 0 && (
        <>
          <span
            onClick={deselectAll}
            className="align-center my-1 flex w-max cursor-pointer select-none rounded-full bg-red-500 px-2 py-1 text-sm font-semibold text-gray-100 transition duration-150 ease-in-out hover:bg-red-600"
          >
            Deselect all
            <img
              src={removeIcon}
              alt="Remove"
              className="pl-1 transition duration-150 ease-in-out"
            />
          </span>
          <span className="border border-gray-400"></span>
        </>
      )}

      {selectedGenres?.map((genre) => (
        <GenreChip
          key={genre.id}
          genreTitle={genre.name}
          isActive
          handleClick={() => handleRemove(genre)}
        />
      ))}

      {data?.data.genres
        .filter((g) => !selectedGenres.find((e) => e.id === g.id))
        ?.map((genre) => (
          <GenreChip
            key={genre.id}
            genreTitle={genre.name}
            handleClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
