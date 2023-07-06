import removeIcon from "../assets/icons/remove.svg"

type GenreChipProps = {
  genreTitle: string
  handleClick: any
  isActive?: boolean
}

const GenreChip: React.FC<GenreChipProps> = ({
  genreTitle,
  handleClick,
  isActive,
}) => {
  return (
    <span
      onClick={handleClick}
      className={`px-2 py-1 my-1 rounded-full font-semibold text-sm flex align-center w-max cursor-pointer select-none transition duration-150 ease-in-out 
        ${
          isActive
            ? "bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-700 removeIcons:hover:brightness-90"
            : "bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-gray-200"
        }
      `}
    >
      {genreTitle}
      {isActive ? (
        <img
          src={removeIcon}
          alt="Remove"
          className="transition duration-150 ease-in-out pl-1"
        />
      ) : null}
    </span>
  )
}

export default GenreChip
