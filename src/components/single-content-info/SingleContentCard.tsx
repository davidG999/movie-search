import { useState } from "react"
import { Link } from "react-router-dom"

import { p_300 } from "../../assets/TMDB/posterSizes"
import posterUnavailable from "../../assets/TMDB/poster-unavailbable.jpg"

import { ISingleContent } from "../../../interfaces"

const SingleContentCard: React.FC<ISingleContent> = ({
  id,
  poster,
  title = "",
  date,
  media_type = "",
  vote_average = 0,
}) => {
  const [underline, setUnderline] = useState<string>("")

  const ratingBg =
    vote_average >= 7
      ? "bg-green-600"
      : vote_average >= 5
      ? "bg-orange-600"
      : vote_average >= 0.1
      ? "bg-red-600"
      : "bg-blue-600"

  const displayTitle = () => {
    return title.length > 30
      ? title
          .split(" ")
          .splice(0, title.split(" ").length - 2)
          .join(" ") + "..."
      : title.length > 25
      ? title
          .split(" ")
          .splice(0, title.split(" ").length - 1)
          .join(" ") + "..."
      : title
  }

  return (
    <div className="flex m-3 text-slate-100">
      <div className="relative bg-movie-card w-50 hover:bg-gray-600 hover:shadow-xl duration-100 rounded-t-lg rounded">
        <span
          title={!vote_average ? "Information not available" : undefined}
          className={`absolute inline-block ${
            ratingBg === "bg-blue-600" ? "w-10" : "w-8"
          } h-7 font-medium text-lg rounded-full text-center pb-1 px-1 -m-3 ${ratingBg}`}
        >
          {vote_average
            ? vote_average.toFixed(vote_average === 10 ? 0 : 1)
            : "N/A"}
        </span>
        <Link to={"/" + id + media_type[0]}>
          <img
            src={poster ? `${p_300}/${poster}` : posterUnavailable}
            className="rounded-t"
            alt="Poster"
          />
          <h2
            className={`text-center font-bold py-1 px-2 ${underline}`}
            onMouseEnter={() => setUnderline("underline underline-offset-1")}
            onMouseLeave={() => setUnderline("")}
            title={title}
          >
            {displayTitle()}
          </h2>
        </Link>

        <div className="flex justify-between brightness-90 pt-2 px-2 pb-1">
          <div> {media_type === "movie" ? "Movie" : "TV"} </div>
          <div> {date?.split("-")[0]} </div>
        </div>
      </div>
    </div>
  )
}

export default SingleContentCard
