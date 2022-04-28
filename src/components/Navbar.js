import trendingIcon from '../assets/icons/trendingIcon.svg';
import movieIcon from '../assets/icons/movieIcon.svg';
import tvIcon from '../assets/icons/tvIcon.svg';
import searchIcon from '../assets/icons/searchIcon.svg';

const NavItem = ({ icon, title }) => {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer mx-8 hover:opacity-50">
      <img className="justify-self-center" src={icon} alt={title} />
      <span>{title}</span>
    </div>
  );
}

const Navbar = () => {
  return (
    <div className="w-full fixed bottom-0 z-50 flex justify-center items-center bg-zinc-900 font-bold pt-2 pb-1">
      <NavItem icon={trendingIcon} title="Trending" />
      <NavItem icon={movieIcon} title="Movies" />
      <NavItem icon={tvIcon} title="TV Series" />
      <NavItem icon={searchIcon} title="Search" />
    </div>
  );
}

export default Navbar;
