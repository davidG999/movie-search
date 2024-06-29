import { IGenre } from "../../../types";
import removeIcon from "../../assets/icons/remove.svg";

type GenreChipProps = {
  genreTitle: string;
  handleClick: () => void;
  isActive?: boolean;
};

const GenreChip: React.FC<GenreChipProps> = ({
  genreTitle,
  handleClick,
  isActive,
}) => {
  return (
    <span
      onClick={handleClick}
      className={`align-center my-1 flex w-max cursor-pointer select-none rounded-full px-2 py-1 text-sm font-semibold transition duration-150 ease-in-out ${
        isActive
          ? "bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-700 removeIcons:hover:brightness-90"
          : "bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-gray-200"
      } `}
    >
      {genreTitle}
      {isActive ? (
        <img
          src={removeIcon}
          alt="Remove"
          className="pl-1 transition duration-150 ease-in-out"
        />
      ) : null}
    </span>
  );
};

export default GenreChip;
