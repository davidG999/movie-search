import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"

import convertDate from "../utils/convertDate"
import minutesToHours from "../utils/minutesToHours"

import NotFound from "./NotFound"

import noPicture from "../assets/TMDB/no-picture.jpg"
import { p_154, p_300, p_500 } from "../assets/TMDB/posterSizes"
import posterUnavailable from "../assets/TMDB/poster-unavailbable.jpg"

import { IGenre, ISingleContent } from "../../interfaces"

type Credits = {
  id: number
  profile_path: string
  name: string
  character: string
}

interface ISingleContentInfo extends ISingleContent {
  vote_count: number
  genres: IGenre[]
  runtime: string
  overview: string
  episode_run_time: any
  popularity: number
}

const SingleContentInfo: React.FC = () => {
  let { id } = useParams<{ id: string }>()
  id = id || ""

  const [content, setContent] = useState<ISingleContentInfo>()
  const [contentRatings, setContentRatings] = useState()
  const [credits, setCredits] = useState<Credits[]>()
  const [notFound, setNotFound] = useState<any>(null)
  const media_type = (id || "").slice(-1) === "t" ? "tv" : "movie"

  const fetchSingleContentInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${(id || "").slice(
          0,
          -1
        )}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      const { data } = response
      setContent(data)
    } catch (error) {
      if (error) {
        setNotFound(<NotFound />)
      }
    }
  }

  const fetchTvContentRatings = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${(id || "").slice(
        0,
        -1
      )}/content_ratings?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US`
    )
    data.results[0] && setContentRatings(data.results[0].rating)
  }

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${(id || "").slice(
        0,
        -1
      )}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )

    if (data.cast.length > 10) data.cast.length = 10
    data && setCredits(data.cast)
  }

  const {
    title,
    name,
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
  } = content || {}

  const checkEpisodeRuntime = () => {
    if (episode_run_time) {
      if (episode_run_time?.length === 0) return "N/A"
      if (episode_run_time?.length === 1) return episode_run_time + "m"
      if (episode_run_time?.length > 1) {
        episode_run_time.sort((a: number, b: number) => a - b)
        return episode_run_time[0] + "-" + episode_run_time.slice(-1) + "m"
      }
    }
  }

  const shortenNameAndCharacter = (str: string): string => {
    if (str && str?.length > 15) return str.slice(0, 14) + "..."
    return str
  }

  const ratingBg =
    vote_average >= 7
      ? "bg-green-600"
      : vote_average >= 5
      ? "bg-orange-600"
      : vote_average >= 0.1
      ? "bg-red-600"
      : "bg-blue-600"

  const kFormatter = (num: number): string => {
    return Math.abs(num) > 999
      ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + "k"
      : String(Math.sign(num) * Math.abs(num))
  }

  const popularityInfo = `Popularity is based on the information below
  • Number of votes for the day
  • Number of views for the day
  • Number of users who marked it as a "favourite" for the day
  • Number of users who added it to their "watchlist" for the day
  • Release date / Next/last episode to air date
  • Number of total votes 
  • Previous days score`

  useEffect(() => {
    fetchSingleContentInfo()
    ;(id || "").slice(-1) === "t" && fetchTvContentRatings()
    fetchCredits()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {notFound || (
        <div className="flex flex-wrap">
          <h3 className="font-bold text-5xl text-gray-200 mb-4 text-center my-3 mx-auto">
            {" "}
            {title || name}{" "}
          </h3>

          <div className="w-full rounded overflow-hidden shadow-2xl mx-4 flex justify-between">
            <div className="md:flex-shrink-0">
              <img
                src={poster_path ? `${p_300}${poster_path}` : posterUnavailable}
                className="rounded"
                alt="Poster"
              />
            </div>

            <div className="flex-col flex-grow px-6 py-2">
              <div className="flex justify-between mb-4">
                <div className="flex text-center">
                  <div className="flex-col mr-6">
                    <span className="font-semibold text-xl inline-block w-full">
                      {" "}
                      Date{" "}
                    </span>
                    <span className="inline-block w-full border border-slate-500 p-1.5">
                      {" "}
                      {first_air_date || release_date
                        ? convertDate(first_air_date || release_date)
                        : "N/A"}{" "}
                    </span>
                  </div>
                  <div className="flex-col mr-6">
                    <span className="font-semibold text-xl inline-block w-full">
                      {" "}
                      Runtime{" "}
                    </span>
                    <span className="inline-block w-full border border-slate-500 p-1.5">
                      {" "}
                      {episode_run_time
                        ? checkEpisodeRuntime()
                        : runtime
                        ? minutesToHours(runtime)
                        : "N/A"}{" "}
                    </span>
                  </div>
                  {contentRatings && (
                    <div className="flex-col mr-6">
                      <span className="font-semibold text-xl inline-block w-full">
                        {" "}
                        Content rating{" "}
                      </span>
                      <span className="inline-block w-full border border-slate-500 p-1.5">
                        {" "}
                        {contentRatings}{" "}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mb-4">
                <div className="flex">
                  <div className="flex-col">
                    <div className="flex">
                      {genres?.map((g) => (
                        <span
                          key={g.id}
                          className="last:mr-0 mr-3 px-2 py-1 rounded-full font-semibold text-sm flex align-center w-max bg-gray-600 text-gray-300"
                        >
                          {g.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex text-center mb-4">
                <div className="flex-col mr-6">
                  <span className="font-semibold text-xl inline-block w-full">
                    {" "}
                    TMDb rating{" "}
                  </span>
                  <div className="flex">
                    <span
                      title={!vote_average ? "Information not available" : ""}
                      className={`text-white inline-block w-full p-1.5 font-bold text-md
                        ${ratingBg}`}
                    >
                      {vote_average
                        ? vote_average.toFixed(vote_average === 10 ? 0 : 1) +
                          "/10"
                        : "N/A"}
                    </span>
                    <span
                      title="Number of votes"
                      className="bg-gray-500 text-white inline-block w-full p-1.5 font-medium opacity-75"
                    >
                      {vote_count ? kFormatter(vote_count) : "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span
                    title={popularityInfo}
                    className="font-semibold text-xl inline-block w-full"
                  >
                    {" "}
                    Popularity{" "}
                  </span>
                  <span
                    title={popularityInfo}
                    className="border border-slate-500 w-full h-full pt-1.5"
                  >
                    {" "}
                    {popularity && Math.floor(popularity)}{" "}
                  </span>
                </div>
              </div>

              <div className="border border-gray-400 mb-4"></div>

              <div className="flex-grow">
                <p className="text-xl text-gray-100">
                  {overview || "No overview"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex  rounded shadow-2xl m-4  pb-20">
            {credits?.map((c) => (
              <div
                key={c.id}
                className="w-full rounded-lg bg-movie-card mr-2 last:mr-0"
              >
                <img
                  className={`w-full rounded-t-lg ${
                    !c.profile_path && "w-200"
                  }`}
                  src={
                    c.profile_path
                      ? `${credits.length > 5 ? p_500 : p_154}` + c.profile_path
                      : noPicture
                  }
                  alt="Profile"
                />

                <div title={c.name} className="p-1 text-center font-medium">
                  {c.name && shortenNameAndCharacter(c.name)}
                </div>

                <div title={c.character} className="p-2 opacity-80">
                  as {c.character && shortenNameAndCharacter(c.character)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default SingleContentInfo
