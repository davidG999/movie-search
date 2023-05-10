import { IGenre } from "../components/Genres";

const useGenres = (selectedGenres: IGenre[]): string => {
  if (selectedGenres.length < 1) return '';

  const genreIds = selectedGenres.map(g => g.id);
  return genreIds.reduce((acc, curr) => acc + ',' + curr.toString(), '');
}

export default useGenres;
