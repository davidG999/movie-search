import shortenNameAndCharacter from "../../utils/single-content-info/shortenNameAndCharacter";

import { POSTER_SIZE_154, POSTER_SIZE_500 } from "../../utils/api";

import noPicture from "../../assets/TMDB/no-picture.jpg";

import { Credits } from "../../../types";

type CredistProps = {
  credits: Credits[];
};

const CreditsSection: React.FC<CredistProps> = ({ credits }) => {
  const setImg = (c: Credits) => {
    const imageSize = credits.length > 5 ? POSTER_SIZE_500 : POSTER_SIZE_154;
    return c.profile_path ? `${imageSize}${c.profile_path}` : noPicture;
  };

  return (
    <div className="m-4 flex rounded pb-20 shadow-2xl">
      {credits?.map((c) => (
        <div
          key={c.id}
          className="mr-2 w-full rounded-lg bg-movie-card last:mr-0"
        >
          <img
            className={`w-full rounded-t-lg ${!c.profile_path && "w-200"}`}
            src={setImg(c)}
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
  );
};

export default CreditsSection;
