import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import axios from "axios"

import NotFound from "../NotFound"
import ContentDetails from "./ContentDetails"
import CreditsSection from "./Credits"

import { Credits, ISingleContentInfo } from "../../../types"

const SingleContentInfo: React.FC = () => {
  let { id } = useParams<{ id: string }>()
  id = id || ""

  const [content, setContent] = useState<ISingleContentInfo | undefined>()
  const [contentRatings, setContentRatings] = useState<string | undefined>()
  const [credits, setCredits] = useState<Credits[]>()
  const [notFound, setNotFound] = useState<boolean>(false)
  const media_type = (id || "").at(-1) === "t" ? "tv" : "movie"

  const { title, name } = content || {}

  const fetchSingleContentInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${(id || "").slice(
          0,
          -1
        )}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      setContent(response.data)
    } catch (error) {
      setNotFound(true)
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

    if (data.results[0]) {
      setContentRatings(data.results[0].rating)
    }
  }

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${(id || "").slice(
        0,
        -1
      )}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )

    if (data.cast.length > 10) data.cast.length = 10

    if (data) {
      setCredits(data.cast)
    }
  }

  useEffect(() => {
    fetchSingleContentInfo()

    if ((id || "").at(-1) === "t") {
      fetchTvContentRatings()
    }

    fetchCredits()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {notFound ? (
        <NotFound />
      ) : (
        <div className="flex flex-wrap">
          <h3 className="font-bold text-5xl text-gray-200 mb-4 text-center my-3 mx-auto">
            {title || name}
          </h3>

          <ContentDetails content={content} contentRatings={contentRatings} />

          <CreditsSection credits={credits || []} />
        </div>
      )}
    </>
  )
}

export default SingleContentInfo
