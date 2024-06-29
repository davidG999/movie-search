import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import $api from "../../api/api";

import NotFound from "../NotFound";
import ContentDetails from "./ContentDetails";
import CreditsSection from "./Credits";

import { Credits, ISingleContentInfo } from "../../../types";

const SingleContentInfo: React.FC = () => {
  const [content, setContent] = useState<ISingleContentInfo | undefined>();
  const [contentRatings, setContentRatings] = useState<string | undefined>();
  const [credits, setCredits] = useState<Credits[]>();
  const [notFound, setNotFound] = useState<boolean>(false);

  let { id } = useParams<{ id: string }>();
  id = id || "";

  const media_type: "tv" | "movie" = (id || "").at(-1) === "t" ? "tv" : "movie";
  const { title, name } = content || {};

  const fetchSingleContentInfo = async () => {
    try {
      const { data } = await $api.get(
        `${media_type}/${(id || "").slice(0, -1)}`,
      );

      setContent(data);
    } catch (error) {
      setNotFound(true);
    }
  };

  const fetchTvContentRatings = async () => {
    const { data } = await $api.get(
      `tv/${(id || "").slice(0, -1)}/content_ratings`,
    );

    if (data.results[0]) {
      setContentRatings(data.results[0].rating);
    }
  };

  const fetchCredits = async () => {
    const { data } = await $api.get(
      `${media_type}/${(id || "").slice(0, -1)}/credits`,
    );

    if (data.cast.length > 10) {
      data.cast.length = 10;
    }

    if (data) {
      setCredits(data.cast);
    }
  };

  useEffect(() => {
    fetchSingleContentInfo();

    if ((id || "").at(-1) === "t") {
      fetchTvContentRatings();
    }

    fetchCredits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {notFound ? (
        <NotFound />
      ) : (
        <div className="flex flex-wrap">
          <h3 className="mx-auto my-3 mb-4 text-center text-5xl font-bold text-gray-200">
            {title || name}
          </h3>

          <ContentDetails content={content} contentRatings={contentRatings} />

          <CreditsSection credits={credits || []} />
        </div>
      )}
    </>
  );
};

export default SingleContentInfo;
