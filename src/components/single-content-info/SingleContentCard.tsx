import { useState } from "react"
import { Link } from "react-router-dom"

import { POSTER_SIZE_300 } from "../../api/api"

import getRatingBg from "../../utils/single-content-info/setRatingBg"
import formatTitle from "../../utils/single-content-info/displayTitle"

import posterUnavailable from "../../assets/TMDB/poster-unavailbable.jpg"

import { ISingleContent } from "../../../types"

const SingleContentCard: React.FC<ISingleContent> = ({
  id,
  poster,
  title = "",
  date,
  media_type = "",
  vote_average = 0,
}) => {
  const [underline, setUnderline] = useState<string>("")

  const ratingBg = getRatingBg(vote_average)

  const formattedTitle = formatTitle(title)

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
            src={poster ? `${POSTER_SIZE_300}/${poster}` : posterUnavailable}
            className="rounded-t"
            alt="Poster"
          />
          <h2
            className={`text-center font-bold py-1 px-2 ${underline}`}
            onMouseEnter={() => setUnderline("underline underline-offset-1")}
            onMouseLeave={() => setUnderline("")}
            title={title}
          >
            {formattedTitle}
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
