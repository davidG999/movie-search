import convertDate from "../../utils/single-content-info/convertDate";
import setEpisodeRuntime from "../../utils/single-content-info/setEpisodeRuntime";
import minutesToHours from "../../utils/single-content-info/minutesToHours";
import popularityInfo from "../../utils/single-content-info/popularityInfo";
import kFormatter from "../../utils/single-content-info/kFormatter";
import getRatingBg from "../../utils/single-content-info/setRatingBg";

import { POSTER_SIZE_300 } from "../../utils/api";

import posterUnavailable from "../../assets/TMDB/poster-unavailbable.jpg";

import { ISingleContentInfo } from "../../../types";

type ContentDetailsProps = {
  content: ISingleContentInfo | undefined;
  contentRatings: string | undefined;
};

const ContentDetails: React.FC<ContentDetailsProps> = ({
  content,
  contentRatings,
}) => {
  const {
    genres,
    vote_average = 0,
    vote_count,
    first_air_date,
    release_date,
    runtime,
    episode_run_time,
    overview,
    poster_path,
    popularity,
  } = content || {};

  const ratingBg = getRatingBg(vote_average);

  return (
    <div className="mx-4 flex w-full justify-between overflow-hidden rounded shadow-2xl">
      <div className="md:flex-shrink-0">
        <img
          src={
            poster_path ? `${POSTER_SIZE_300}${poster_path}` : posterUnavailable
          }
          className="rounded"
          alt="Poster"
        />
      </div>

      <div className="flex-grow flex-col px-6 py-2">
        <div className="mb-4 flex justify-between">
          <div className="flex text-center">
            <div className="mr-6 flex-col">
              <span className="inline-block w-full text-xl font-semibold">
                Date
              </span>
              <span className="inline-block w-full border border-slate-500 p-1.5">
                {first_air_date || release_date
                  ? convertDate(first_air_date || release_date)
                  : "N/A"}
              </span>
            </div>
            <div className="mr-6 flex-col">
              <span className="inline-block w-full text-xl font-semibold">
                Runtime
              </span>
              <span className="inline-block w-full border border-slate-500 p-1.5">
                {episode_run_time
                  ? setEpisodeRuntime(episode_run_time)
                  : runtime
                    ? minutesToHours(runtime)
                    : "N/A"}
              </span>
            </div>
            {contentRatings && (
              <div className="mr-6 flex-col">
                <span className="inline-block w-full text-xl font-semibold">
                  Content rating
                </span>
                <span className="inline-block w-full border border-slate-500 p-1.5">
                  {contentRatings}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4 flex justify-between">
          <div className="flex">
            <div className="flex-col">
              <div className="flex">
                {genres?.map((g) => (
                  <span
                    key={g.id}
                    className="align-center mr-3 flex w-max rounded-full bg-gray-600 px-2 py-1 text-sm font-semibold text-gray-300 last:mr-0"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 flex text-center">
          <div className="mr-6 flex-col">
            <span className="inline-block w-full text-xl font-semibold">
              TMDb rating
            </span>
            <div className="flex">
              <span
                title={!vote_average ? "Information not available" : ""}
                className={`text-md inline-block w-full p-1.5 font-bold text-white ${ratingBg}`}
              >
                {vote_average
                  ? vote_average.toFixed(vote_average === 10 ? 0 : 1) + "/10"
                  : "N/A"}
              </span>
              <span
                title="Number of votes"
                className="inline-block w-full bg-gray-500 p-1.5 font-medium text-white opacity-75"
              >
                {vote_count ? kFormatter(vote_count) : "N/A"}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span
              title={popularityInfo}
              className="inline-block w-full text-xl font-semibold"
            >
              Popularity
            </span>
            <span
              title={popularityInfo}
              className="h-full w-full border border-slate-500 pt-1.5"
            >
              {popularity && Math.floor(popularity)}
            </span>
          </div>
        </div>

        <div className="mb-4 border border-gray-400"></div>

        <div className="flex-grow">
          <p className="text-xl text-gray-100">{overview || "No overview"}</p>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;
