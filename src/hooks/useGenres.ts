import { IGenre } from "../../types";

const useGenres = (selectedGenres: IGenre[]): string => {
  return selectedGenres.map((g) => g.id).join(",");
};

export default useGenres;
