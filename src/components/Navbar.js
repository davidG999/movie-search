import { Link } from 'react-router-dom';

import trendingIcon from '../assets/icons/trendingIcon.svg';
import movieIcon from '../assets/icons/movieIcon.svg';
import tvIcon from '../assets/icons/tvIcon.svg';
import searchIcon from '../assets/icons/searchIcon.svg';
import tmdbLogo from '../assets/TMDB/tmdb-logo.svg';

const NavItem = ({ icon, title, page }) => {
  return (
    <Link to={page} className="flex flex-col items-center justify-center cursor-pointer mx-8 hover:opacity-50">
      <img className="justify-self-center" src={icon} alt={title} />
      <span>{title}</span>
    </Link>
  );
}

const Navbar = () => {
  return (
    <div className="w-full fixed bottom-0 z-50 flex justify-center items-center bg-zinc-900 font-bold pt-2 pb-1">
      <NavItem icon={trendingIcon} title="Trending" page="/" />
      <NavItem icon={movieIcon} title="Movies" page="/movies" />
      <NavItem icon={tvIcon} title="TV Series" page="/series" />
      <NavItem icon={searchIcon} title="Search" page="/search" />

      <div className="absolute bottom-0 right-0 p-1">
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" >
          <img src={tmdbLogo} alt="TMDB" width={40} />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
