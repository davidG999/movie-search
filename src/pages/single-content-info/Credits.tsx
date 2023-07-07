import shortenNameAndCharacter from "../../utils/single-content-info/shortenNameAndCharacter"

import { POSTER_SIZE_154, POSTER_SIZE_500 } from "../../api/api"

import noPicture from "../../assets/TMDB/no-picture.jpg"

import { Credits } from "../../../types"

type CredistProps = {
  credits: Credits[]
}

const CreditsSection: React.FC<CredistProps> = ({ credits }) => {
  const setImg = (c: Credits) => {
    const imageSize = credits.length > 5 ? POSTER_SIZE_500 : POSTER_SIZE_154
    return c.profile_path ? `${imageSize}${c.profile_path}` : noPicture
  }

  return (
    <div className="flex rounded shadow-2xl m-4 pb-20">
      {credits?.map((c) => (
        <div
          key={c.id}
          className="w-full rounded-lg bg-movie-card mr-2 last:mr-0"
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
  )
}

export default CreditsSection
