import { useState } from "react";
import { Link } from "react-router-dom";

import { POSTER_SIZE_300 } from "../../api/api";

import getRatingBg from "../../utils/single-content-info/setRatingBg";
import formatTitle from "../../utils/single-content-info/displayTitle";

import posterUnavailable from "../../assets/TMDB/poster-unavailbable.jpg";

import { ISingleContent } from "../../../types";

const SingleContentCard: React.FC<ISingleContent> = ({
  id,
  poster,
  title = "",
  date,
  media_type = "",
  vote_average = 0,
}) => {
  const [underline, setUnderline] = useState<string>("");

  const ratingBg = getRatingBg(vote_average);

  const formattedTitle = formatTitle(title);

  return (
    <div className="m-3 flex text-slate-100">
      <div className="w-50 relative rounded rounded-t-lg bg-movie-card duration-100 hover:bg-gray-600 hover:shadow-xl">
        <span
          title={!vote_average ? "Information not available" : undefined}
          className={`absolute inline-block ${
            ratingBg === "bg-blue-600" ? "w-10" : "w-8"
          } -m-3 h-7 rounded-full px-1 pb-1 text-center text-lg font-medium ${ratingBg}`}
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
            className={`px-2 py-1 text-center font-bold ${underline}`}
            onMouseEnter={() => setUnderline("underline underline-offset-1")}
            onMouseLeave={() => setUnderline("")}
            title={title}
          >
            {formattedTitle}
          </h2>
        </Link>

        <div className="flex justify-between px-2 pb-1 pt-2 brightness-90">
          <div> {media_type === "movie" ? "Movie" : "TV"} </div>
          <div> {date?.split("-")[0]} </div>
        </div>
      </div>
    </div>
  );
};

export default SingleContentCard;
