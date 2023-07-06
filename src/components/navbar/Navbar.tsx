import NavItem from "./NavItem"

import trendingIcon from "../assets/icons/trendingIcon.svg"
import movieIcon from "../assets/icons/movieIcon.svg"
import tvIcon from "../assets/icons/tvIcon.svg"
import searchIcon from "../assets/icons/searchIcon.svg"
import tmdbLogo from "../assets/TMDB/tmdb-logo.svg"

const Navbar: React.FC = () => {
  return (
    <div className="w-full fixed bottom-0 z-50 flex justify-center items-center bg-zinc-900 font-bold pt-2 pb-1">
      <NavItem icon={trendingIcon} title="Trending" page="/" />
      <NavItem icon={movieIcon} title="Movies" page="/movies" />
      <NavItem icon={tvIcon} title="TV Series" page="/series" />
      <NavItem icon={searchIcon} title="Search" page="/search" />

      <div className="absolute bottom-0 right-0 p-1">
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          <img src={tmdbLogo} alt="TMDB" width={40} />
        </a>
      </div>
    </div>
  )
}

export default Navbar
